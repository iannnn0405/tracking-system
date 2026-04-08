import styles from './HowItWorks.module.css';
import { UserPlus, Settings2, BarChart3, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <UserPlus size={30} />,
    step: '01',
    title: 'Create Your Account',
    desc: 'Faculty sign up with their institutional email. The admin verifies and assigns program access within minutes.',
  },
  {
    icon: <Settings2 size={30} />,
    step: '02',
    title: 'Set Up Your Program',
    desc: 'Add your subjects, sections, and student roster. Import existing data from spreadsheets or enroll manually.',
  },
  {
    icon: <BarChart3 size={30} />,
    step: '03',
    title: 'Track & Announce',
    desc: 'Mark attendance in one tap, post announcements to your class feed, and watch your dashboard update in real time.',
  },
  {
    icon: <Rocket size={30} />,
    step: '04',
    title: 'Review & Report',
    desc: 'Access detailed analytics, generate reports, and share insights with your department chair or academic office.',
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>Simple Process</span>
          <h2 className={styles.title}>
            Up and running in<br />
            <span className={styles.accent}>under 10 minutes</span>
          </h2>
          <p className={styles.subtitle}>
            No IT department required. PolyTrack is designed to be intuitive from day one.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div className={styles.step} key={i}>
              <div className={styles.connector}>
                <div className={styles.iconCircle}>{s.icon}</div>
                {i < steps.length - 1 && <div className={styles.line} />}
              </div>
              <div className={styles.content}>
                <span className={styles.stepNum}>{s.step}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}