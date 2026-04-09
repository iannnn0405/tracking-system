'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { sileo } from 'sileo';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './verify.module.css';

export default function VerifyStudentID() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (!session) {
          router.push('/login');
        } else {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/login');
      } finally {
        setIsCheckingUser(false);
      }
    };

    checkUser();
  }, [router]);

  const handleVerifyStudentID = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentId.trim()) {
      sileo.error({
        title: 'Student ID Required',
        description: 'Please enter your student ID',
        duration: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      // Update user metadata with student ID
      const { error } = await supabase.auth.updateUser({
        data: {
          student_id: studentId.trim(),
          verified: true,
        },
      });

      if (error) throw error;

      sileo.success({
        title: 'Student ID Verified!',
        description: 'Redirecting to dashboard...',
        duration: 2000,
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      sileo.error({
        title: 'Verification Failed',
        description: error.message || 'Please try again',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      // Skip verification and go directly to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isCheckingUser) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

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
            Verify Your Identity
          </div>
          <h2 className={styles.heroTitle}>
            Student ID<br />
            Verification
          </h2>
          <p className={styles.heroDesc}>
            To complete your registration, please verify your identity with your student ID. This helps us ensure you're part of the DORSU community.
          </p>

          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <div>
                <p className={styles.benefitTitle}>Institutional Access</p>
                <p className={styles.benefitDesc}>Full access to academic tools</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <div>
                <p className={styles.benefitTitle}>Student Records</p>
                <p className={styles.benefitDesc}>View your grades and transcripts</p>
              </div>
            </div>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>✓</div>
              <div>
                <p className={styles.benefitTitle}>Campus Community</p>
                <p className={styles.benefitDesc}>Connect with other students</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <Link href="/register" className={styles.backButton}>
          <ArrowLeft size={15} />
          Back
        </Link>

        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Verification</p>
          <h1 className={styles.formTitle}>Confirm Your Identity</h1>
          <p className={styles.formSubtitle}>Enter your student ID to complete registration.</p>
        </div>

        <form className={styles.form} onSubmit={handleVerifyStudentID}>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              id="studentId"
              placeholder=" "
              required
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              autoComplete="off"
              disabled={isLoading}
            />
            <label htmlFor="studentId">Student ID</label>
            <span className={styles.fieldLine} />
          </div>

          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              <strong>Where to find your Student ID:</strong>
              <br />
              • On your student ID card
              <br />
              • In your university email
              <br />
              • On your enrollment documents
            </p>
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Student ID'}
          </button>

          <button 
            type="button"
            className={styles.skipBtn}
            onClick={handleSkip}
            disabled={isLoading}
          >
            Skip for Now
          </button>
        </form>

        <p className={styles.footerText}>
          You can verify your student ID later in your account settings.
        </p>
      </div>
    </div>
  );
}
