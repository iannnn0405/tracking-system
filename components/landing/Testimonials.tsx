import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "PolyTrack completely replaced our paper attendance sheets. I can now see real-time data from any device — even during class.",
    name: "Dr. Maria Santos",
    role: "Chair, Political Science Department",
    avatar: "MS",
    rating: 5,
  },
  {
    quote: "The announcement feature alone saved us hours every week. Students actually read the notices because they get them instantly.",
    name: "Prof. James Regalado",
    role: "Faculty, Development Communication",
    avatar: "JR",
    rating: 5,
  },
  {
    quote: "I love how clean and intuitive the dashboard is. I was up and running within the same afternoon I signed up.",
    name: "Dr. Claire Villanueva",
    role: "Program Chair, Psychology",
    avatar: "CV",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>Faculty Stories</span>
          <h2 className={styles.title}>
            Trusted by the educators<br />
            <span className={styles.accent}>who matter most</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div className={styles.card} key={i}>
              <div className={styles.stars}>
                {'★'.repeat(t.rating)}
              </div>
              <blockquote className={styles.quote}>"{t.quote}"</blockquote>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.avatar}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}