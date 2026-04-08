import styles from './Stats.module.css';

const stats = [
  { value: '98%', label: 'Attendance Accuracy', desc: 'Real-time tracking precision' },
  { value: '3,200+', label: 'Students Tracked', desc: 'Across all programs' },
  { value: '12', label: 'Departments', desc: 'Using PolyTrack daily' },
  { value: '4.9★', label: 'Faculty Rating', desc: 'Average satisfaction score' },
];

export default function Stats() {
  return (
    <section className={styles.stats} id="stats">
      <div className={styles.container}>
        {stats.map((s, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.value}>{s.value}</div>
            <div className={styles.label}>{s.label}</div>
            <div className={styles.desc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}