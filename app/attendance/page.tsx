'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/dashboard/Sidebar';
import { CheckCircle2, XCircle, AlertCircle, Calendar } from 'lucide-react';
import styles from './attendance.module.css';

export default function AttendancePage() {
  const attendanceData = [
    { id: 1, event: 'General Assembly 2024', date: 'Oct 24, 2024', type: 'Institutional', status: 'Present', sanction: 'None' },
    { id: 2, event: 'Tech Seminar: AI Ethics', date: 'Oct 20, 2024', type: 'Departmental', status: 'Absent', sanction: '₱50.00' },
    { id: 3, event: 'Intramural Meet Day 1', date: 'Oct 15, 2024', type: 'Institutional', status: 'Present', sanction: 'None' },
    { id: 4, event: 'Programming Challenge', date: 'Oct 12, 2024', type: 'Departmental', status: 'Present', sanction: 'None' },
    { id: 5, event: 'Clean-up Drive', date: 'Oct 05, 2024', type: 'Community', status: 'Absent', sanction: '2hrs Community Service' },
  ];

  const totalPresent = attendanceData.filter(d => d.status === 'Present').length;
  const totalAbsent = attendanceData.filter(d => d.status === 'Absent').length;

  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Attendance</h1>
          <p>Track your event participation and pending sanctions.</p>
        </header>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <CheckCircle2 size={18} color="#16a34a" /> 
              Attended
            </div>
            <div className={styles.statValue}>{totalPresent}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <XCircle size={18} color="#dc2626" /> 
              Missed
            </div>
            <div className={styles.statValue}>{totalAbsent}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <AlertCircle size={18} color="#eab308" /> 
              Compliance Rate
            </div>
            <div className={styles.statValue}>
              {Math.round((totalPresent / attendanceData.length) * 100)}%
            </div>
          </div>
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2>Attendance History</h2>
          </div>
          <div className={styles.scrollArea}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Event Details</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Sanction</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className={styles.eventInfo}>
                        <h4>{row.event}</h4>
                        <p><Calendar size={12} style={{ marginRight: 4 }} />{row.date}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${row.status === 'Present' ? styles.present : styles.absent}`}>
                        {row.status === 'Present' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                        {row.status}
                      </span>
                    </td>
                    <td>{row.type}</td>
                    <td>
                      <span className={row.sanction === 'None' ? styles.none : styles.sanction}>
                        {row.sanction}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}