'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Updated to include Settings for mobile navigation consistency
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Home', href: '/dashboard' },
    { icon: <Megaphone size={20} />, label: 'Updates', href: '/updates' },
    { icon: <Calendar size={20} />, label: 'Schedule', href: '/schedule' },
    { icon: <UserCheck size={20} />, label: 'Attendance', href: '/attendance' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <aside 
      className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onClick={() => !isMobile && setIsExpanded(!isExpanded)}
    >
      <div className={styles.topSection}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <LayoutDashboard size={18} color="white" />
          </div>
          {isExpanded && <span className={styles.brandName}>PolyTrack</span>}
        </div>
        
        <nav className={styles.nav}>
          {/* Main Navigation Items */}
          {(isMobile ? menuItems : menuItems.slice(0, 4)).map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                {(isExpanded || isMobile) && <span className={styles.label}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {!isMobile && (
        <div className={styles.bottomSection}>
          <Link 
            href="/settings" 
            className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.iconWrapper}><Settings size={20} /></div>
            {isExpanded && <span className={styles.label}>Settings</span>}
          </Link>
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
      )}
    </aside>
  );
}