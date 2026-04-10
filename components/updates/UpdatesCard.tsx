'use client';

import { Share2, Calendar } from 'lucide-react';
import styles from './UpdatesCard.module.css';

export default function UpdatesCard({ post, onClick }: any) {
  return (
    <article className={styles.card} onClick={onClick}>
      {post.image && (
        <div className={styles.imageContainer}>
          <img src={post.image} alt={post.title} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <span className={styles.category}>{post.category}</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
          <Calendar size={14} />
          <span>{post.eventDate}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.author}>
          <div className={styles.avatar}>{post.author[0]}</div>
          <span className={styles.authorName}>{post.author}</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
          <Share2 size={18} />
        </button>
      </div>
    </article>
  );
}