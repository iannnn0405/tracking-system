'use client';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Menu, X, Moon, Sun, LogIn } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 1. Sync theme state with the document attribute on load
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
    if (currentTheme) setTheme(currentTheme);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('polytrack-theme', nextTheme);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isOpen ? styles.menuOpen : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <LayoutDashboard size={24} />
          </div>
          <span className={styles.logoText}>PolyTrack</span>
        </div>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#stats" onClick={() => setIsOpen(false)}>Stats</a>
          <a href="#testimonials" onClick={() => setIsOpen(false)}>Testimonials</a>
          
          <div className={styles.mobileActions}>
            <button className={styles.loginBtnMobile}>
              <LogIn size={18} /> Login
            </button>
            <button className={styles.getStartedBtnMobile}>Get Started Free</button>
          </div>
        </div>

        <div className={styles.navActions}>
          {/* FIXED: Conditional Rendering for Icon */}
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <Moon size={20} className={styles.icon} />
            ) : (
              <Sun size={20} className={styles.icon} />
            )}
          </button>
          
          <button className={styles.loginBtn}>
            <LogIn size={18} /> Login
          </button>
          
          <button className={styles.getStartedBtn}>Get Started Free</button>

          <button 
            className={styles.hamburger} 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
}