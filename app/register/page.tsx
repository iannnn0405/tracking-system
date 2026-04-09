'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ArrowLeft,
  Mail,
  Lock,
  BadgeCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { sileo } from 'sileo';
import { supabase } from '@/lib/supabase';
import styles from './register.module.css';

export default function RegisterPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lastValidationId, setLastValidationId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

      sileo.success({
        title: 'Redirecting to Google',
        description: 'Please complete the sign-up process in the Google window.',
        duration: 3000,
      });
    } catch (error: any) {
      sileo.error({
        title: 'Google Sign-up Failed',
        description: error.message || 'Please try again',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requirements = [
    { label: '8+ Characters', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special Char', met: /[^A-Za-z0-9]/.test(password) },
  ];

  // Check if all requirements are met
  const allRequirementsMet = requirements.every(req => req.met);
  const metCount = requirements.filter(req => req.met).length;

  // Show real-time password validation using Sileo
  useEffect(() => {
    if (password.length > 0) {
      // Dismiss previous validation toast
      if (lastValidationId) {
        sileo.dismiss(lastValidationId);
      }

      if (allRequirementsMet) {
        // Show success when all requirements are met (auto-hides after 3 seconds)
        const id = sileo.success({
          title: 'Password is secure!',
          description: '✓ 8+ Characters • ✓ Uppercase • ✓ Number • ✓ Special Char',
          duration: 3000  // Auto-hide after 3 seconds
        });
        setLastValidationId(id);
      } else {
        // Show progress while typing with met (green) and unmet (red) requirements
        const metReqs = requirements
          .filter(req => req.met)
          .map(req => `✓ ${req.label}`)
          .join(' • ');
        
        const unmetReqs = requirements
          .filter(req => !req.met)
          .map(req => `✗ ${req.label}`)
          .join(' • ');
        
        const descriptionParts = [];
        if (metReqs) descriptionParts.push(metReqs);
        if (unmetReqs) descriptionParts.push(unmetReqs);
        
        // Use warning type for incomplete requirements
        const id = sileo.warning({
          title: 'Password Requirements',
          description: descriptionParts.join('\n'),
          duration: null // Keep visible while typing
        });
        setLastValidationId(id);
      }
    } else {
      // Clear validation toast when password is empty
      if (lastValidationId) {
        sileo.dismiss(lastValidationId);
        setLastValidationId(null);
      }
    }
  }, [password, allRequirementsMet, metCount, lastValidationId]);

  const steps = [
    { label: 'Account Info', desc: 'Email & Security', status: 'active' },
    { label: 'Verification', desc: 'Check your inbox', status: 'pending' },
  ];

  return (
    <div className={styles.wrapper}>
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
            Institutional Access
          </div>
          <h2 className={styles.heroTitle}>
            Join the<br />
            <span>DORSU</span><br />
            Network.
          </h2>
          <p className={styles.heroDesc}>
            PolyTrack brings together academic tracking and student records
            into a single unified workspace for the DORSU community.
          </p>

          <div className={styles.steps}>
            {steps.map((s, i) => (
              <div key={s.label}>
                <div className={styles.stepItem}>
                  <div className={`${styles.stepBullet} ${styles[s.status]}`}>
                    {s.status === 'done' ? <BadgeCheck size={13} /> : i + 1}
                  </div>
                  <div className={styles.stepLabel}>
                    <strong>{s.label}</strong>
                    <span>{s.desc}</span>
                  </div>
                </div>
                {i < steps.length - 1 && <div className={styles.stepConnector} />}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.quoteBlock}>
          <p className={styles.quoteText}>
            "Access to seamless institutional tools is the foundation of an
            empowered academic community."
          </p>
          <p className={styles.quoteAuthor}>DORSU — PolyTrack Initiative</p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <Link href="/login" className={styles.backButton}>
          <ArrowLeft size={15} />
          Back to Login
        </Link>

        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Create Account</p>
          <h1 className={styles.formTitle}>Get Started</h1>
          <p className={styles.formSubtitle}>Enter your institutional email to begin.</p>
        </div>

        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          
          // Validate password meets all requirements
          if (!allRequirementsMet) {
            const unmetReqs = requirements
              .filter(req => !req.met)
              .map(req => req.label)
              .join(', ');
            sileo.error({ 
              title: 'Password requirements not met',
              description: `Missing: ${unmetReqs}`,
              duration: 4000
            });
            return;
          }
          
          sileo.success({ 
            title: 'Account creation initiated!',
            description: 'Your account is being set up. Check your email.',
            duration: 4000
          });
        }}>
          <div className={styles.fieldGroup}>
            <input type="email" id="email" placeholder=" " required autoComplete="email" />
            <label htmlFor="email">Institutional Email</label>
            <Mail className={styles.fieldIcon} size={15} />
            <span className={styles.fieldLine} />
          </div>

          <div className={styles.fieldGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <label htmlFor="password">Password</label>
            <Lock className={styles.fieldIcon} size={15} />
            <button
              type="button"
              className={styles.eyeToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            <span className={styles.fieldLine} />
          </div>

          <div className={styles.fieldGroup}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder=" "
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Lock className={styles.fieldIcon} size={15} />
            <button
              type="button"
              className={styles.eyeToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
            <span className={styles.fieldLine} />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create My Account
          </button>

          <div className={styles.divider}>or</div>

          <button type="button" className={styles.ssoBtn} onClick={handleGoogleSignUp} disabled={isLoading}>
            <span className={styles.ssoIcon}>
              <LayoutDashboard size={11} color="white" />
            </span>
            {isLoading ? 'Signing up...' : 'Sign up with Google'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account? <Link href="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}