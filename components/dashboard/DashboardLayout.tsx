import React from 'react';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>{sidebar}</div>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
