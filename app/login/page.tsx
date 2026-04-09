'use client';
import Link from 'next/link';
import {
  LayoutDashboard,
  ArrowLeft,
  Mail,
  Lock,
  BarChart3,
  Shield,
  Users,
  Bell,
} from 'lucide-react';
import styles from './login.module.css';


export default function LoginPage() {
  return (
    <div className={styles.wrapper}>

      {/* ── LEFT PANEL ── */}
      <div className={styles.leftPanel}>
        <div className={styles.gridOverlay} />

        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <LayoutDashboard size={20} />
          </div>
          <span className={styles.brandName}>PolyTrack</span>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Institutional Management System
          </div>
          <h2 className={styles.heroTitle}>
            One Platform.<br />
            <span>Every Campus</span><br />
            Need.
          </h2>
          <p className={styles.heroDesc}>
            PolyTrack brings together academic tracking, faculty management,
            and student records into a single unified workspace for DORSU.
          </p>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12K+</span>
            <span className={styles.statLabel}>Students</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>340+</span>
            <span className={styles.statLabel}>Faculty</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className={styles.rightPanel}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={15} />
          Back to Home
        </Link>

        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Secure Portal</p>
          <h1 className={styles.formTitle}>Welcome Back</h1>
          <p className={styles.formSubtitle}>
            Log in with your institutional credentials to continue.
          </p>
        </div>

        <form className={styles.form}>

          {/* Email field */}
          <div className={styles.fieldGroup}>
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              autoComplete="email"
            />
            <label htmlFor="email">Institutional Email</label>
            <Mail className={styles.fieldIcon} size={16} />
            <span className={styles.fieldLine} />
          </div>

          {/* Password field */}
          <div className={styles.fieldGroup}>
            <input
              type="password"
              id="password"
              placeholder=" "
              required
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
            <Lock className={styles.fieldIcon} size={16} />
            <span className={styles.fieldLine} />
          </div>

          {/* Options */}
          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In to PolyTrack
          </button>

          <div className={styles.divider}>or</div>

          <button type="button" className={styles.ssoBtn}>
            <span className={styles.ssoIcon}>
              <LayoutDashboard size={11} color="white" />
            </span>
            Continue with Institutional SSO
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link href="/register">Contact your Admin</Link>
        </p>
      </div>

    </div>
  );
}