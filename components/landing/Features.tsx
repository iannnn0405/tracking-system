import styles from './Features.module.css';
import { ClipboardCheck, BellRing, BarChart2, Users, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: <ClipboardCheck size={28} />,
    title: 'Smart Attendance Tracking',
    desc: 'Real-time attendance monitoring with automated alerts for absences and late arrivals. Track trends across classes effortlessly.',
    tag: 'Core',
  },
  {
    icon: <BellRing size={28} />,
    title: 'Instant Announcements',
    desc: 'Push announcements to your entire program or specific classes. Students receive updates instantly via the platform.',
    tag: 'Communication',
  },
  {
    icon: <BarChart2 size={28} />,
    title: 'Analytics Dashboard',
    desc: 'Visualize attendance trends, program performance, and student engagement through intuitive charts and reports.',
    tag: 'Insights',
  },
  {
    icon: <Users size={28} />,
    title: 'Multi-Program Support',
    desc: 'Manage Political Science, DevCom, and Psychology programs independently or view a unified cross-program overview.',
    tag: 'Management',
  },
  {
    icon: <Shield size={28} />,
    title: 'Role-Based Access',
    desc: 'Granular permissions for faculty, program chairs, and admins. Each user sees exactly what they need.',
    tag: 'Security',
  },
  {
    icon: <Zap size={28} />,
    title: 'Automated Reporting',
    desc: 'Generate weekly, monthly, or semester-end attendance and performance reports with one click. Export to PDF or Excel.',
    tag: 'Automation',
  },
];

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>Platform Features</span>
          <h2 className={styles.title}>
            Everything faculty<br />
            <span className={styles.accent}>needs in one place</span>
          </h2>
          <p className={styles.subtitle}>
            Purpose-built tools for academic program management — no bloat, no complexity.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.iconWrap}>{f.icon}</div>
              <span className={styles.tag}>{f.tag}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}