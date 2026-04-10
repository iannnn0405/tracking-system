'use client';

import { X, Calendar } from 'lucide-react';
import styles from './PostModal.module.css';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  eventDate: string;
  author: string;
  likes: number;
  category: string;
}

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        {/* Image */}
        {post.image && (
          <div className={styles.imageContainer}>
            <img src={post.image} alt={post.title} className={styles.image} />
            <span className={styles.categoryBadge}>{post.category}</span>
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{post.title}</h2>
          
          <div className={styles.eventInfo}>
            <Calendar size={18} />
            <span>{post.eventDate}</span>
          </div>

          <p className={styles.description}>{post.description}</p>

          {/* Author Section */}
          <div className={styles.authorSection}>
            <div className={styles.avatar}>{post.author[0]}</div>
            <div>
              <p className={styles.authorName}>{post.author}</p>
              <p className={styles.likes}>{post.likes} people interested</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
          </div>
        </div>
      </div>
    </div>
  );
}
