import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './SecurityRequirements.module.css';

interface Requirement {
  label: string;
  met: boolean;
}

interface SecurityRequirementsProps {
  requirements: Requirement[];
  isVisible: boolean;
}

export default function SecurityRequirements({ requirements, isVisible }: SecurityRequirementsProps) {
  const [show, setShow] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const allMet = requirements.every(req => req.met);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setIsAnimatingOut(false);

      // Hide after 2 seconds ONLY if all requirements are met
      if (allMet) {
        const timer = setTimeout(() => {
          setIsAnimatingOut(true);
          setTimeout(() => setShow(false), 300);
        }, 2000);

        return () => clearTimeout(timer);
      }
    } else {
      setShow(false);
      setIsAnimatingOut(false);
    }
  }, [isVisible, allMet]);

  if (!show) return null;

  const metCount = requirements.filter(req => req.met).length;
  const totalCount = requirements.length;

  return (
    <div className={`${styles.container} ${isAnimatingOut ? styles.fadeOut : ''}`}>
      <div className={styles.toast}>
        <div className={styles.header}>
          <CheckCircle2 size={18} className={styles.icon} />
          <p className={styles.title}>
            {allMet ? 'Password is secure!' : 'Password Requirements'}
          </p>
        </div>
        
        {allMet ? (
          <p className={styles.description}>Your password meets all security requirements.</p>
        ) : (
          <p className={styles.description}>
            {metCount} of {totalCount} requirements met
          </p>
        )}
      </div>
    </div>
  );
}
