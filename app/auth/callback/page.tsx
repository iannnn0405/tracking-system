'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { sileo } from 'sileo';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'signup';

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL fragment
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          const user = session.user;

          // Check if student record exists for both sign-in and sign-up
          const { data: studentRecord, error: studentError } = await supabase
            .from('students')
            .select('id')
            .eq('id', user.id)
            .maybeSingle();

          if (studentError && studentError.code !== 'PGRST116') {
            throw studentError;
          }

          if (type === 'signin') {
            // Sign-in flow: User must have completed registration (student record must exist)
            if (!studentRecord) {
              // User tried to sign in but hasn't completed registration
              sileo.warning({
                title: 'Account Not Completed',
                description: 'Please complete your registration first by signing up.',
                duration: 3000,
              });

              setTimeout(() => {
                router.push('/register');
              }, 3000);
            } else {
              // User has completed registration, redirect to dashboard
              sileo.success({
                title: 'Welcome back!',
                description: 'Redirecting to dashboard...',
                duration: 2000,
              });

              setTimeout(() => {
                router.push('/dashboard');
              }, 2000);
            }
          } else {
            // Sign-up flow: Check if student record already exists
            if (studentRecord) {
              // Student record already exists - redirect to login
              sileo.warning({
                title: 'Account Already Exists',
                description: 'This Google account is already registered. Please sign in instead.',
                duration: 3000,
              });

              setTimeout(() => {
                router.push('/login');
              }, 3000);
            } else {
              // New user - create student record and proceed to verification
              const { error: insertError } = await supabase
                .from('students')
                .insert({
                  id: user.id,
                  email: user.email || '',
                  full_name: user.user_metadata?.full_name || '',
                  student_id: '',
                });

              if (insertError && insertError.code !== '23505') {
                throw insertError;
              }

              sileo.success({
                title: 'Account Created!',
                description: 'Verifying your student ID...',
                duration: 2000,
              });

              setTimeout(() => {
                router.push('/auth/verify-student-id');
              }, 2000);
            }
          }
        } else {
          // No session, redirect to login
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        sileo.error({
          title: 'Authentication Failed',
          description: 'Please try again',
          duration: 4000,
        });
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router, type]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      background: '#0a0f1e',
      color: '#fff'
    }}>
      <p>Completing authentication...</p>
    </div>
  );
}
    