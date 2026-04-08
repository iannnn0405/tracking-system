import styles from './CTA.module.css';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.glow} />
          <span className={styles.pill}>
            <Sparkles size={14} /> Free for Faculty
          </span>
          <h2 className={styles.title}>
            Ready to transform<br />how you manage attendance?
          </h2>
          <p className={styles.subtitle}>
            Join hundreds of faculty members already using PolyTrack. No credit card required.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Get Started Free <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryBtn}>Schedule a Demo</button>
          </div>
          <p className={styles.footnote}>✓ Free forever plan &nbsp;·&nbsp; ✓ No setup fees &nbsp;·&nbsp; ✓ Cancel anytime</p>
        </div>
      </div>
    </section>
  );
}