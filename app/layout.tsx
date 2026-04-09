'use client';
import { Unbounded, Kulim_Park } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { Toaster } from 'sileo';

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const kulimPark = Kulim_Park({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-kulim-park",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('polytrack-theme') as 'light' | 'dark' | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved ?? preferred;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <body className={`${unbounded.variable} ${kulimPark.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var saved = localStorage.getItem('polytrack-theme');
            var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', saved || preferred);
          })();
        ` }} />
        <Toaster position="top-center" theme="system">
          {children}
        </Toaster>
      </body>
    </html>
  );
}