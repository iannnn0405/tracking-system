'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { sileo } from 'sileo';
import { supabase } from '@/lib/supabase';
import styles from './login.module.css';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      sileo.error({
        title: 'Missing Credentials',
        description: 'Please enter both email and password',
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        sileo.success({
          title: 'Welcome back!',
          description: 'Redirecting to dashboard...',
          duration: 2000,
        });

        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      sileo.error({
        title: 'Sign In Failed',
        description: error.message || 'Invalid email or password',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?type=signin`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      sileo.success({
        title: 'Redirecting to Google',
        description: 'Please complete the sign-in process in the Google window.',
        duration: 3000,
      });
    } catch (error: any) {
      sileo.error({
        title: 'Google Sign In Failed',
        description: error.message || 'Please try again',
        duration: 4000,
      });
      setIsLoading(false);
    }
  };

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

        <form className={styles.form} onSubmit={handleEmailSignIn}>

          {/* Email field */}
          <div className={styles.fieldGroup}>
            <input
              type="email"
              id="email"
              placeholder=" "
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="password">Password</label>
            <Lock className={styles.fieldIcon} size={16} />
            <span className={styles.fieldLine} />
          </div>

          {/* Options */}
          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" disabled={isLoading} /> Remember me
            </label>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In to PolyTrack'}
          </button>

          <div className={styles.divider}>or</div>

          <button 
            type="button" 
            className={styles.ssoBtn}
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <span className={styles.ssoIcon}>
              <LayoutDashboard size={11} color="white" />
            </span>
            {isLoading ? 'Signing In...' : 'Continue with Google'}
          </button>
        </form>

        <p className={styles.footerText}>
          Don't have an account?{' '}
          <Link href="/register">Create Account</Link>
        </p>
      </div>

    </div>
  );
}