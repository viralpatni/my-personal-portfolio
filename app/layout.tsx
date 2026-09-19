import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F7' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
};

export const metadata: Metadata = {
  title: 'Viral Patni | Full Stack Developer & AI/ML Explorer',
  description: 'Portfolio of Viral Patni — B.Tech CSE at VIT Chennai. Full-stack projects, AI/ML experiments, DSA practice, and open-source work.',
  keywords: ['Viral Patni', 'Full Stack Developer', 'AI ML', 'Data Science', 'React', 'Next.js', 'Python', 'VIT Chennai', 'Portfolio'],
  authors: [{ name: 'Viral Patni' }],
  creator: 'Viral Patni',
  openGraph: {
    title: 'Viral Patni | Full Stack Developer & AI/ML Explorer',
    description: 'Full-stack projects, AI/ML experiments, and DSA — built with intent at VIT Chennai.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viral Patni | Full Stack Developer',
    description: 'Full-stack · AI/ML · DSA — VIT Chennai.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Viral Patni',
  jobTitle: 'Full Stack Developer',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'VIT Chennai' },
  email: 'mailto:patniviral554@gmail.com',
  url: 'https://github.com/viralpatni',
  sameAs: ['https://github.com/viralpatni', 'https://www.linkedin.com/in/viral-patni-0a103a319'],
  knowsAbout: ['React', 'Next.js', 'Python', 'SQL', 'MySQL', 'Data Science', 'Machine Learning'],
};

const themeInit = `(function(){try{var t=localStorage.getItem('vp-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeInit }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head><body>{children}</body></html>;
}
