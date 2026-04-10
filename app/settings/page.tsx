'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/dashboard/Sidebar';
import { QRCodeSVG } from 'qrcode.react';
import { User, QrCode, Download, ShieldCheck, Save } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sileo } from 'sileo';
import styles from './settings.module.css';

export default function SettingsPage() {
  const router = useRouter();
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    studentId: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Load student information from Supabase
  useEffect(() => {
    const loadStudentInfo = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          router.push('/login');
          return;
        }

        setCurrentUser(session.user);

        // Fetch student record from students table
        const { data: studentData, error: dataError } = await supabase
          .from('students')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (dataError && dataError.code !== 'PGRST116') throw dataError;

        if (studentData) {
          setStudentInfo({
            name: studentData.full_name || '',
            studentId: studentData.student_id || '',
            email: studentData.email || session.user.email || ''
          });
        } else {
          // No student record exists yet, create one
          const userEmail = session.user.email || '';
          const { error: insertError } = await supabase
            .from('students')
            .insert({
              id: session.user.id,
              email: userEmail,
              full_name: session.user.user_metadata?.full_name || '',
              student_id: '',
            });

          if (insertError && insertError.code !== '23505') {
            // 23505 is unique constraint violation, which means record already exists
            throw insertError;
          }

          setStudentInfo({
            name: session.user.user_metadata?.full_name || '',
            studentId: '',
            email: userEmail
          });
        }
      } catch (error) {
        console.error('Error loading student info:', error);
        sileo.error({
          title: 'Failed to Load Profile',
          description: 'Could not load your student information',
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentInfo();
  }, [router]);

  const handleSaveChanges = async () => {
    if (!studentInfo.name.trim()) {
      sileo.error({
        title: 'Full Name Required',
        description: 'Please enter your full name',
        duration: 3000,
      });
      return;
    }

    if (!studentInfo.studentId.trim()) {
      sileo.error({
        title: 'Student ID Required',
        description: 'Please enter your student ID',
        duration: 3000,
      });
      return;
    }

    try {
      setIsSaving(true);

      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      // Update student record
      const { error } = await supabase
        .from('students')
        .update({
          full_name: studentInfo.name.trim(),
          student_id: studentInfo.studentId.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      sileo.success({
        title: 'Profile Updated',
        description: 'Your changes have been saved successfully',
        duration: 3000,
      });
    } catch (error: any) {
      sileo.error({
        title: 'Save Failed',
        description: error.message || 'Could not save your changes',
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Data formatted for the QR code
  const qrData = JSON.stringify({
    n: studentInfo.name,
    id: studentInfo.studentId
  });

  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Settings</h1>
          <p>Manage your account and student identification.</p>
        </header>

        <div className={styles.settingsGrid}>
          <section className={styles.glassCard}>
            <div className={styles.sectionTitle}>
              <User size={20} color="#2563eb" />
              <h2>Profile Information</h2>
            </div>
            
            <div className={styles.profileInfo}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({...studentInfo, name: e.target.value})}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Student ID</label>
                <input 
                  type="text" 
                  value={studentInfo.studentId}
                  onChange={(e) => setStudentInfo({...studentInfo, studentId: e.target.value})}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={studentInfo.email} 
                  disabled 
                  style={{ background: '#f8fafc', cursor: 'not-allowed' }} 
                />
              </div>

              <button 
                className={styles.saveBtn}
                onClick={handleSaveChanges}
                disabled={isSaving || isLoading}
              >
                <Save size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </section>

          <section className={styles.glassCard}>
            <div className={styles.qrSection}>
              <div className={styles.sectionTitle} style={{ marginBottom: 0 }}>
                <QrCode size={20} color="#2563eb" />
                <h2>E-ID QR Code</h2>
              </div>
              
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Present this code during event entry to record your attendance.
              </p>

              <div className={styles.qrContainer}>
                <QRCodeSVG 
                  value={qrData} 
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <button className={styles.downloadBtn}>
                <Download size={16} />
                Download PNG
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#16a34a', fontSize: '0.75rem', fontWeight: 700 }}>
                <ShieldCheck size={14} />
                SECURELY GENERATED
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}