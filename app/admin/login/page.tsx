'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './admin-login.module.css';

const TOTAL_FRAMES = 192;
const FRAME_PATH = '/ezgif-2e6b936d0ef3698c-png-split/ezgif-frame-';

export default function AdminLoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNumber = String(i).padStart(3, '0');
      img.src = `${FRAME_PATH}${frameNumber}.png`;
      img.onload = () => {
        loaded++;
        setImagesLoaded(loaded);
      };
      images.push(img);
    }

    framesRef.current = images;
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setScrollProgress(progress);

      const frameIndex = Math.floor(progress * (TOTAL_FRAMES - 1));
      setCurrentFrame(Math.min(frameIndex, TOTAL_FRAMES - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw image on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || framesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = framesRef.current[currentFrame];
    if (!img.complete) return;

    // Set canvas size to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw image
    ctx.drawImage(img, 0, 0);
  }, [currentFrame, imagesLoaded]);

  const isLoaded = imagesLoaded === TOTAL_FRAMES;

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className={styles.heroTitle}>
            SonicWave <span>Pro</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Experience audio redefined
          </p>
          <motion.div
            className={styles.scrollPrompt}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to Explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M19 13l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll Linked Animation Section */}
      <section className={styles.scrollSection}>
        <div className={styles.scrollContent}>
          {/* Canvas */}
          <div className={styles.canvasWrapper}>
            <canvas
              ref={canvasRef}
              className={styles.canvas}
              style={{
                opacity: imagesLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
            {!isLoaded && (
              <div className={styles.loadingState}>
                <div className={styles.loadingBar}>
                  <div
                    className={styles.loadingFill}
                    style={{ width: `${(imagesLoaded / TOTAL_FRAMES) * 100}%` }}
                  />
                </div>
                <p className={styles.loadingText}>
                  Loading Sequence... {imagesLoaded}/{TOTAL_FRAMES}
                </p>
              </div>
            )}
          </div>

          {/* Parallax Text Overlays */}
          <motion.div
            className={styles.textOverlay1}
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 3),
            }}
          >
            <h2>Sound Redefined</h2>
            <p>Premium audio engineering at its finest</p>
          </motion.div>

          <motion.div
            className={styles.textOverlay2}
            style={{
              opacity: Math.max(0, Math.min(1, scrollProgress * 3 - 1)),
            }}
          >
            <h2>Engineered for Perfection</h2>
            <p>Every component meticulously crafted</p>
          </motion.div>

          <motion.div
            className={styles.textOverlay3}
            style={{
              opacity: Math.max(0, scrollProgress * 2 - 0.5),
            }}
          >
            <h2>Transform Your Experience</h2>
            <p>The future of audio technology</p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.indicatorBar}>
            <div
              className={styles.indicatorFill}
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <motion.h2
          className={styles.featuresTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Premium Specifications
        </motion.h2>

        <div className={styles.featuresGrid}>
          {[
            { icon: '🔊', title: 'Immersive Audio', desc: 'Lossless compression with spatial audio' },
            { icon: '🔋', title: 'Extended Battery', desc: '60+ hours of continuous playback' },
            { icon: '🎯', title: 'Adaptive ANC', desc: 'AI-powered noise cancellation' },
            { icon: '💫', title: 'Premium Materials', desc: 'Aerospace-grade aluminum & leather' },
            { icon: '🌐', title: 'Multi-Device', desc: 'Seamless connection across devices' },
            { icon: '⚡', title: 'Fast Charging', desc: '10 min charge for 2 hours playback' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Experience the Difference?</h2>
          <p>Join thousands of audiophiles who've switched to SonicWave Pro</p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pre-Order Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
