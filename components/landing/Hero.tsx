import styles from './Hero.module.css';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        
        <div className={styles.leftPanel}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowDot} />
            Now in Early Access
          </div>

          <h1 className={styles.heading}>
            Program<br />
            <span className={styles.headingAccent}>Management</span><br />
            Simplified
          </h1>

          <p className={styles.subheading}>
            The all-in-one platform designed specifically for faculty to monitor attendance, 
            deliver announcements, and manage academic programs with ease and efficiency.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn}>
              Get Started Free
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>
              <Play size={18} /> Watch Demo
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <div className={styles.previewTitle}>Live Dashboard Preview</div>
              <div className={styles.statusDot} />
            </div>
            <div className={styles.mockup}>
              <div className={styles.mockupScreen}>
                <div className={styles.mockupAttendance}>92% Attendance Today</div>
                <div className={styles.mockupClass}>POLSCI 101 - International Relations</div>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            Built for Political Science • DevCom • Psychology Faculty
          </div>
        </div>

      </div>
    </section>
  );
}