'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Sidebar from '@/components/dashboard/Sidebar';
import UpdatesCard from '@/components/updates/UpdatesCard';
import PostModal from '@/components/updates/PostModal';
import { Search } from 'lucide-react';
import styles from './updates.module.css';

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

export default function UpdatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const posts: Post[] = [
    {
      id: '1',
      title: 'AI & Machine Learning Workshop',
      description: 'An exclusive session with industry experts exploring the future of neural networks and automation. Learn about cutting-edge technologies and network with peers.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      eventDate: 'Oct 24, 2026',
      author: 'Dr. Sarah Chen',
      likes: 124,
      category: 'DevCom'
    },
    {
      id: '2',
      title: 'Psychology Research Presentation',
      description: 'Join our department for a presentation on behavioral psychology and cognitive development. Open discussion session to follow.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      eventDate: 'Nov 05, 2026',
      author: 'Prof. James Wilson',
      likes: 89,
      category: 'Psych'
    },
    {
      id: '3',
      title: 'Political Science Seminar: Global Governance',
      description: 'Explore current global governance structures and international relations. Expert panelists will discuss emerging political challenges.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      eventDate: 'Nov 12, 2026',
      author: 'Dr. Margaret Lee',
      likes: 76,
      category: 'Pol Sci'
    },
    {
      id: '4',
      title: 'Student Project Showcase - DevCom',
      description: 'See what our students have been building! From web apps to mobile solutions, explore amazing projects developed in our department.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
      eventDate: 'Oct 30, 2026',
      author: 'Tech Club',
      likes: 156,
      category: 'DevCom'
    }
  ];

  const categories = ['All', 'DevCom', 'Psych', 'Pol Sci'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout sidebar={<Sidebar />}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>Campus Updates</h1>
          <p>Stay informed with the latest events and announcements.</p>
        </header>

        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <Search size={20} color="#94a3b8" />
            <input 
              type="text" 
              placeholder="Search announcements..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterContainer}>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.feedContainer}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <UpdatesCard 
                key={post.id} 
                post={post}
                onClick={() => setSelectedPost(post)}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>No posts found for this category.</p>
            </div>
          )}
        </div>

        {selectedPost && (
          <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </div>
    </DashboardLayout>
  );
}