import React, { useState } from 'react';
import { Bell, Calendar, CheckSquare } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  activeTab?: 'announcements' | 'calendar' | 'attendance';
  onTabChange?: (tab: 'announcements' | 'calendar' | 'attendance') => void;
}

export default function Navbar({ activeTab = 'announcements', onTabChange }: NavbarProps) {
  const navItems = [
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <Bell size={20} />,
      badge: 2,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: <Calendar size={20} />,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CheckSquare size={20} />,
    },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.navTitle}>Dashboard</h1>
        <div className={styles.navItems}>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`}
              onClick={() => onTabChange?.(item.id as any)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
