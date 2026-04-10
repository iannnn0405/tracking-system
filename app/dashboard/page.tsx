'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/dashboard/Sidebar';
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  History
} from 'lucide-react';
import styles from './dashboard.module.css';

function FlippingStatCard({ label, val, icon, description }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`${styles.cardWrapper} ${isFlipped ? styles.flipped : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.statLabel}>
            {label}
            {icon}
          </div>
          <div className={styles.statValue}>{val}</div>
        </div>
        <div className={styles.cardBack}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const stats = [
    { label: 'Total Events', val: '24', icon: <Users size={16} />, desc: 'All academic and institutional sessions this semester.' },
    { label: 'Attendance', val: '88%', icon: <CheckCircle size={16} />, desc: 'Real-time verified presence across your modules.' },
    { label: 'Absences', val: '04', icon: <XCircle size={16} />, desc: 'Missed sessions requiring official documentation.' },
    { label: 'Upcoming', val: '07', icon: <Clock size={16} />, desc: 'Scheduled events within the next seven days.' },
  ];

  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <div className={styles.wrapper}>
        
        <header className={styles.header}>
          <h1>Dashboard</h1>
          <p>PolyTrack Analytics • Academic Session 2026</p>
        </header>

        <section className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <FlippingStatCard 
              key={i}
              label={stat.label}
              val={stat.val}
              icon={stat.icon}
              description={stat.desc}
            />
          ))}
        </section>

        <div className={styles.mainGrid}>
          {/* LEFT: Upcoming Events (Big Card) */}
          <section className={styles.mainCard}>
            <div className={styles.cardHeader}>
              <Calendar size={20} color="#2563eb" />
              <h2>Upcoming Events</h2>
            </div>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <div className={`${styles.iconBox} ${styles.blueBox}`}>
                  <Clock size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>Advanced Physics Lecture</h4>
                  <p>Tomorrow at 09:00 AM • Room 101 • Prof. Richards</p>
                </div>
              </div>
              <div className={styles.listItem}>
                <div className={`${styles.iconBox} ${styles.blueBox}`}>
                  <MapPin size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>Institutional Workshop</h4>
                  <p>Wednesday at 02:00 PM • Main Hall B • Career Services</p>
                </div>
              </div>
              <div className={styles.listItem}>
                <div className={`${styles.iconBox} ${styles.blueBox}`}>
                  <Calendar size={20} />
                </div>
                <div className={styles.itemInfo}>
                  <h4>Departmental Seminar</h4>
                  <p>Friday at 11:00 AM • Virtual Hall • Dr. Miller</p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: Activity History (Side Card) */}
          <section className={styles.sideCard}>
            <div className={styles.cardHeader}>
              <History size={20} color="#2563eb" />
              <h2>Event History</h2>
            </div>
            <div className={styles.historyStack}>
              <div className={styles.historyItem}>
                <div className={`${styles.iconBox} ${styles.greenBox}`}>
                  <CheckCircle size={18} />
                </div>
                <div className={styles.historyInfo}>
                  <h4>History of Arts</h4>
                  <p>Attended • Monday at 10:00 AM</p>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={`${styles.iconBox} ${styles.redBox}`}>
                  <XCircle size={18} />
                </div>
                <div className={styles.historyInfo}>
                  <h4>Chemistry Lab</h4>
                  <p>Missed • Oct 14 at 02:00 PM</p>
                </div>
              </div>
              <div className={styles.historyItem}>
                <div className={`${styles.iconBox} ${styles.greenBox}`}>
                  <CheckCircle size={18} />
                </div>
                <div className={styles.historyInfo}>
                  <h4>English Composition</h4>
                  <p>Attended • Oct 12 at 01:00 PM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}