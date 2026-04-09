'use client';

import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Calendar, 
  UserCheck, 
  ChevronRight,
  LogOut,
  Settings
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Megaphone size={20} />, label: 'Updates' },
    { icon: <Calendar size={20} />, label: 'Schedule' },
    { icon: <UserCheck size={20} />, label: 'Attendance' },
  ];

  const handleToggle = () => {
    if (!isMobile) setIsExpanded(!isExpanded);
  };

  return (
    <aside 
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onClick={handleToggle}
    >
      <div className={styles.topSection}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <LayoutDashboard size={18} color="white" />
          </div>
          {isExpanded && <span className={styles.brandName}>PolyTrack</span>}
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item, idx) => (
            <div key={idx} className={styles.navItem} onClick={(e) => e.stopPropagation()}>
              <div className={styles.iconWrapper}>{item.icon}</div>
              {(isExpanded || isMobile) && <span className={styles.label}>{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.navItem} onClick={(e) => e.stopPropagation()}>
          <div className={styles.iconWrapper}><Settings size={20} /></div>
          {isExpanded && <span className={styles.label}>Settings</span>}
        </div>
        <div className={styles.navItem} onClick={(e) => e.stopPropagation()}>
          <div className={styles.iconWrapper}><LogOut size={20} /></div>
          {isExpanded && <span className={styles.label}>Logout</span>}
        </div>
        
        <div className={styles.toggleHint}>
          <ChevronRight 
            size={14} 
            className={`${styles.chevron} ${isExpanded ? styles.rotate : ''}`} 
          />
        </div>
      </div>
    </aside>
  );
}