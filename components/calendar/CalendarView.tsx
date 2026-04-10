'use client';

import { useState, useMemo } from 'react';
import { MapPin, ChevronLeft, ChevronRight, CalendarDays, Inbox } from 'lucide-react';
import styles from './Calendar.module.css';

export default function CalendarView() {
  const realDate = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(realDate.getDate());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const events = [
    { id: 1, day: realDate.getDate(), month: realDate.getMonth(), year: realDate.getFullYear(), title: 'Current Session', time: '11:00 AM', loc: 'Hall C' },
    { id: 2, day: 15, month: 3, year: 2026, title: 'UI/UX Design Review', time: '02:30 PM', loc: 'Studio 2' },
    { id: 3, day: 22, month: 3, year: 2026, title: 'AI Ethics Workshop', time: '09:00 AM', loc: 'Lab 4' },
  ];

  const { daysInMonth, startDay, currentMonth, currentMonthIdx, currentYear, todayDay } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const isThisMonth = realDate.getMonth() === month && realDate.getFullYear() === year;

    return {
      daysInMonth: totalDays,
      startDay: firstDayIndex,
      currentMonth: monthNames[month],
      currentMonthIdx: month,
      currentYear: year,
      todayDay: isThisMonth ? realDate.getDate() : null
    };
  }, [currentDate]);

  const selectedEvents = events.filter(e => 
    e.day === selectedDate && 
    e.month === currentMonthIdx && 
    e.year === currentYear
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1>Schedule</h1>
        <p>Your academic calendar and session timeline.</p>
      </header>

      <div className={styles.layout}>
        <section className={styles.glassCard}>
          <div className={styles.calendarHeader}>
            <div className={styles.monthDisplay}>
              <h2>{currentMonth} <span style={{ color: '#94a3b8', fontSize: '1rem' }}>{currentYear}</span></h2>
            </div>
            <div className={styles.navControls}>
              <button className={styles.navBtn} onClick={() => setCurrentDate(new Date(currentYear, currentMonthIdx - 1, 1))}><ChevronLeft size={16} /></button>
              <button className={styles.navBtn} onClick={() => setCurrentDate(new Date(currentYear, currentMonthIdx + 1, 1))}><ChevronRight size={16} /></button>
            </div>
          </div>

          <div className={styles.calendarGrid}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, index) => (
              <div key={`${d}-${index}`} className={styles.dayLabel}>
                <span className={styles.mobileDayLabel}>{d.charAt(0)}</span>
                <span className={styles.desktopDayLabel}>{d}</span>
              </div>
            ))}
            
            {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} className={styles.emptyCell} />)}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === todayDay;
              const isSelected = day === selectedDate;
              const hasEvent = events.some(e => e.day === day && e.month === currentMonthIdx && e.year === currentYear);

              return (
                <div 
                  key={day} 
                  className={`${styles.dayCell} ${isSelected ? styles.activeDay : ''} ${isToday ? styles.todayHighlight : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span>{day}</span>
                  {hasEvent && (
                    isToday ? (
                      <span className={styles.todayTag}>Today</span>
                    ) : (
                      <span className={styles.upcomingTag}>Event</span>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.glassCard}>
          <div className={styles.sidebarHeader}>
            <CalendarDays size={18} color="#2563eb" />
            <h3>Agenda • {currentMonth} {selectedDate}</h3>
          </div>
          
          <div className={styles.timeline}>
            {selectedEvents.length > 0 ? selectedEvents.map(event => (
              <div key={event.id} className={styles.timelineItem}>
                <div className={styles.timeInfo}>
                  <span className={styles.time}>{event.time}</span>
                </div>
                <div className={styles.eventCard}>
                  <div className={styles.eventTitle}>{event.title}</div>
                  <div className={styles.eventLocation}>
                    <MapPin size={12} /> {event.loc}
                  </div>
                </div>
              </div>
            )) : (
              <div className={styles.emptyState}>
                <Inbox size={20} style={{ marginBottom: '4px', opacity: 0.6 }} />
                <p>No events</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}