'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const githubUsername = 'viralpatni';
const resumePath = '/Job_Resume_Viral_Patni.pdf';
const email = 'patniviral554@gmail.com';

type Repository = { id: number; name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number; forks_count?: number; updated_at: string; homepage: string | null };
type StudioSlide = { id: string; title: string; description: string; meta: string; url?: string; image?: string };
type ProjectFilter = 'all' | 'fullstack' | 'ai-ml' | 'dsa';

const roles = ['Full Stack Developer', 'AI / ML Explorer', 'Data Science Enthusiast'];
type Milestone = { year: string; title: string; detail: string; tag: 'Education' | 'Community' | 'Project' | 'Internship' | 'In progress' | 'Future'; url?: string; stack?: string };
const milestones: Milestone[] = [
  { year: '2024', title: 'Started B.Tech CSE Core at VIT Chennai', detail: 'Core CS fundamentals, building beyond the syllabus.', tag: 'Education' },
  { year: '2024', title: 'Joined Haryana Hood Literary Club', detail: 'Found a creative home — writing, events, community.', tag: 'Community' },
  { year: '2025', title: 'Built Campus360, first full stack project', detail: 'College platform: HTML + CSS + PHP + MySQL, shipped end to end.', tag: 'Project', url: 'https://github.com/viralpatni', stack: 'HTML · CSS · PHP · MySQL' },
  { year: '2025', title: 'Smart Dhobi — laundry workflow product', detail: 'Practical web product for bookings, tracking, and everyday utility.', tag: 'Project', url: 'https://github.com/viralpatni/smart-dhobi', stack: 'JavaScript · Web · Product' },
  { year: '2025', title: 'Promoted to club lead for 50+ members', detail: 'Leading events, content, and a 50+ member community.', tag: 'Community' },
  { year: '2026', title: 'NorthPeak Digital — internship task', detail: 'Polished web experience built around clear hierarchy, motion, and product thinking.', tag: 'Internship', url: 'https://github.com/viralpatni/NorthPeak-Digital', stack: 'JavaScript · Web · Motion' },
  { year: '2026', title: 'LogiSync — currently building', detail: 'Logistics sync dashboard in progress — tracking, status flow, and clean data views.', tag: 'In progress', stack: 'React · Data · Product' },
  { year: '2028', title: 'Expected B.Tech graduation', detail: 'More products, more questions, open to internships.', tag: 'Future' },
];
const curatedProjects: Repository[] = [
  { id: 9002, name: 'DSA', description: 'Solving and storing LeetCode and competitive programming solutions with optimal time & space complexity.', language: 'C++', html_url: 'https://github.com/viralpatni/DSA', stargazers_count: 0, updated_at: '2026-09-19T13:24:05Z', homepage: null },
  { id: 9003, name: 'LogiSync', description: 'Logistics sync dashboard in progress — tracking, status workflow, and clean data views.', language: 'TypeScript', html_url: 'https://github.com/viralpatni/LogiSync', stargazers_count: 0, updated_at: '2026-09-18T03:57:54Z', homepage: null },
  { id: 9004, name: 'NorthPeak-Digital', description: 'Internship task — polished web experience built around clear hierarchy, fluid motion, and product thinking.', language: 'JavaScript', html_url: 'https://github.com/viralpatni/NorthPeak-Digital', stargazers_count: 0, updated_at: '2026-07-26T04:28:42Z', homepage: null },
  { id: 9005, name: 'fathers-day', description: 'A thoughtful celebration website with a personal visual direction, responsive layout, and animations.', language: 'TypeScript', html_url: 'https://github.com/viralpatni/fathers-day', stargazers_count: 0, updated_at: '2026-06-21T04:38:12Z', homepage: null },
  { id: 9006, name: 'my-personal-portfolio', description: 'Personal resume website shaped into an expressive, interactive portfolio system.', language: 'HTML', html_url: 'https://github.com/viralpatni/my-personal-portfolio', stargazers_count: 0, updated_at: '2026-06-04T10:45:38Z', homepage: null },
  { id: 9007, name: 'smart-dhobi', description: 'Practical web product for laundry bookings, order tracking, and everyday utility.', language: 'JavaScript', html_url: 'https://github.com/viralpatni/smart-dhobi', stargazers_count: 0, updated_at: '2026-04-05T17:55:13Z', homepage: null },
  { id: 9008, name: 'campus360-redo', description: 'Modernized campus platform for student utility, scheduling, and academic resources.', language: 'HTML', html_url: 'https://github.com/viralpatni/campus360-redo', stargazers_count: 0, updated_at: '2026-04-01T09:40:40Z', homepage: null },
];
const fallbackSlides: StudioSlide[] = [
  { id: 'northpeak', title: 'NorthPeak Digital', description: 'A polished web experience built around clear hierarchy, motion, and product thinking.', meta: 'JavaScript / web / product thinking', url: 'https://github.com/viralpatni/NorthPeak-Digital' },
  { id: 'portfolio', title: 'My personal portfolio', description: 'A personal resume website shaped into an expressive, interactive portfolio system.', meta: 'HTML / CSS / frontend', url: 'https://github.com/viralpatni/my-personal-portfolio' },
  { id: 'fathers-day', title: 'Fathers Day', description: 'A thoughtful celebration website with a personal visual direction and responsive layout.', meta: 'TypeScript / interaction / web', url: 'https://github.com/viralpatni/fathers-day' },
  { id: 'dsa', title: 'DSA', description: 'A living practice space for data structures, algorithms, and consistent problem solving.', meta: 'Python / algorithms / learning', url: 'https://github.com/viralpatni/DSA' },
  { id: 'smart-dhobi', title: 'Smart Dhobi', description: 'A practical web product exploring useful workflows, simple interactions, and everyday utility.', meta: 'JavaScript / product / web', url: 'https://github.com/viralpatni/smart-dhobi' }
];
const skills = [
  ['Py', 'Python', 'python', 'python', 'automation, data analysis, and backend development'],
  ['C+', 'C / C++', 'cpp', 'cplusplus', 'systems programming, performance, and DSA'],
  ['Ja', 'Java', 'java', 'openjdk', 'object-oriented applications and backend services'],
  ['JS', 'JavaScript', 'javascript', 'javascript', 'interactive web experiences and full stack apps'],
  ['SQL', 'SQL', 'sql', 'postgresql', 'querying, organizing, and analyzing data'],
  ['</>', 'HTML / CSS', 'web', 'html5', 'accessible structure and visual interface design'],
  ['Re', 'React.js', 'react', 'react', 'component-driven user interfaces'],
  ['DB', 'MySQL', 'mysql', 'mysql', 'relational databases and application data'],
  ['Git', 'Git', 'git', 'git', 'version control and collaborative development'],
  ['Np', 'NumPy', 'numpy', 'numpy', 'numerical computing and array-based data work'],
  ['Pd', 'Pandas', 'pandas', 'pandas', 'data cleaning, transformation, and exploration'],
  ['ML', 'AI / ML', 'ml', 'tensorflow', 'intelligent systems, prediction, and experimentation']
];
const skillLevels: Record<string, { level: string; pct: number; usedIn: string }> = {
  'Python': { level: 'Advanced', pct: 85, usedIn: 'DSA · Campus360 · data scripts' },
  'C / C++': { level: 'Advanced', pct: 80, usedIn: 'DSA practice · systems basics' },
  'Java': { level: 'Intermediate', pct: 65, usedIn: 'OOP coursework · backend services' },
  'JavaScript': { level: 'Advanced', pct: 82, usedIn: 'Portfolio · NorthPeak · Smart Dhobi' },
  'SQL': { level: 'Intermediate', pct: 70, usedIn: 'Campus360 · queries · reporting' },
  'HTML / CSS': { level: 'Advanced', pct: 88, usedIn: 'Every shipped site' },
  'React.js': { level: 'Intermediate', pct: 72, usedIn: 'Portfolio (Next.js) · UI components' },
  'MySQL': { level: 'Intermediate', pct: 68, usedIn: 'Campus360 relational schema' },
  'Git': { level: 'Advanced', pct: 80, usedIn: 'All repos · collaboration' },
  'NumPy': { level: 'Intermediate', pct: 62, usedIn: 'DSA math · data experiments' },
  'Pandas': { level: 'Intermediate', pct: 60, usedIn: 'Data cleaning · exploration' },
  'AI / ML': { level: 'Exploring', pct: 45, usedIn: 'Coursework · prototypes' },
};

function categorize(name: string, description: string | null, language: string | null): ProjectFilter | 'general' {
  const hay = `${name} ${description ?? ''} ${language ?? ''}`.toLowerCase();
  if (/(dsa|leetcode|algorithm|data-structure)/.test(hay)) return 'dsa';
  if (/(tensorflow|pytorch|pandas|numpy|machine|ml|ai|data-science|classifier|prediction)/.test(hay)) return 'ai-ml';
  if (/(react|next|html|css|php|mysql|full|web|app|platform|site|portfolio|digital|dhobi)/.test(hay)) return 'fullstack';
  return 'general';
}

function describeRepo(repo: Repository) {
  const lang = repo.language ?? 'web';
  return {
    problem: repo.description ?? `An open-source ${lang} project by Viral Patni — built to learn by shipping.`,
    solution: `Designed and built with ${lang}, version-controlled on GitHub, iterated in the open with real commits.`,
    stack: `${lang} · Git · GitHub`,
    learned: 'Scoping a real problem, structuring code for others to read, and finishing.',
  };
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  const [role, setRole] = useState(roles[0]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [githubState, setGithubState] = useState<'loading' | 'ready' | 'profile-sync' | 'cached' | 'curated' | 'error'>('loading');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [command, setCommand] = useState('');
  const [terminal, setTerminal] = useState(["Welcome, Viral's portfolio terminal is ready.", "Type 'help' to see available commands."]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');
  const [projectQuery, setProjectQuery] = useState('');
  const [projectSort, setProjectSort] = useState<'updated' | 'stars' | 'name'>('updated');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const terminalOutputRef = useRef<HTMLDivElement>(null);

  useEffect(() => { try { const saved = document.documentElement.dataset.theme; if (saved === 'dark' || saved === 'light') setTheme(saved); } catch { /* noop */ } }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { document.documentElement.dataset.theme = next; localStorage.setItem('vp-theme', next); } catch { /* noop */ }
  };
  useEffect(() => { const timer = window.setInterval(() => setRole(current => roles[(roles.indexOf(current) + 1) % roles.length]), 2800); return () => window.clearInterval(timer); }, []);
  const loadRepos = async () => {
    setGithubState('loading');
    try {
      const res = await fetch('/api/github', { headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (res.ok) {
        const payload = await res.json();
        if (Array.isArray(payload.repos) && payload.repos.length) {
          setRepositories(payload.repos);
          setLastSynced(payload.cachedAt ?? new Date().toISOString());
          const src = payload.source as string;
          if (src === 'api') setGithubState('ready');
          else if (src === 'profile-sync') setGithubState('profile-sync');
          else setGithubState('curated');
          return;
        }
      }
    } catch { /* fall through */ }
    setRepositories([]);
    setGithubState('curated');
  };
  useEffect(() => { loadRepos(); }, []);

  const studioSlides: StudioSlide[] = repositories.length
    ? repositories.slice(0, 6).map(repo => ({ id: String(repo.id), title: repo.name.replaceAll('-', ' '), description: repo.description ?? 'A project built by Viral Patni.', meta: `${repo.language ?? 'web'} / open source / selected work`, url: repo.html_url }))
    : fallbackSlides;
  const currentSlide = studioSlides[activeSlide % studioSlides.length];
  useEffect(() => { setActiveSlide(0); }, [repositories.length]);
  useEffect(() => {
    if (reduceMotion || paused || studioSlides.length < 2) return;
    const timer = window.setInterval(() => setActiveSlide(current => (current + 1) % studioSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, studioSlides.length]);

  useEffect(() => {
    const ids = ['top', 'about', 'projects', 'timeline', 'contact'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setResumeOpen(false);
      setSelectedRepo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = resumeOpen || selectedRepo ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [resumeOpen, selectedRepo]);

  useEffect(() => {
    terminalOutputRef.current?.scrollTo({ top: terminalOutputRef.current.scrollHeight });
  }, [terminal]);

  const runCommand = (raw?: string) => {
    const value = (raw ?? command).trim().toLowerCase();
    if (!value) return;
    if (value !== 'clear') setHistory(h => [...h, value].slice(-30));
    setHistoryIndex(-1);
    if (value === 'clear') { setTerminal([]); setCommand(''); return; }
    if (value.startsWith('goto ')) {
      const target = value.replace('goto ', '').trim();
      const el = document.getElementById(target);
      if (el) { el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); setTerminal(lines => [...lines, `> ${value}`, `navigated to #${target}`]); }
      else setTerminal(lines => [...lines, `> ${value}`, `no section '${target}'. try: about · projects · timeline · contact`]);
      setCommand('');
      return;
    }
    const replies: Record<string, string> = {
      help: 'whoami · education · skills · projects · achievements · contact · email · resume · goto <section> · date · neofetch · clear',
      whoami: 'Viral Patni · Full Stack Developer · VIT Chennai',
      education: 'VIT Chennai · B.Tech CSE Core · Expected 2028',
      skills: 'Python · C/C++ · Java · JavaScript · React · SQL · MySQL · NumPy · Pandas · AI/ML',
      projects: 'Live repositories are rendered in #projects. Try: goto projects',
      achievements: 'Solve-A-Thon Hackathon · Lead @ Haryana Hood Literary Club (50+ members)',
      contact: `${email} · github.com/viralpatni`,
      email: email,
      resume: 'Resume preview opens from the nav. Click Resume ↗ up top.',
      date: new Date().toString(),
      neofetch: 'OS: VIT-OS · Shell: ambition · Memory: unlimited',
    };
    setTerminal(lines => [...lines, `> ${value}`, replies[value] ?? "command not found. Try 'help'."]);
    setCommand('');
  };

  const onTerminalKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') runCommand();
    else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setCommand(history[next] ?? '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < 0) return;
      const next = historyIndex + 1;
      if (next >= history.length) { setHistoryIndex(-1); setCommand(''); }
      else { setHistoryIndex(next); setCommand(history[next]); }
    }
  };

  const copyEmail = async () => {
    try { await navigator.clipboard?.writeText(email); } catch { /* clipboard unavailable */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const downloadVCard = () => {
    const vcard = ['BEGIN:VCARD', 'VERSION:3.0', 'FN:Viral Patni', 'TITLE:Full Stack Developer', `EMAIL:${email}`, 'URL:https://github.com/viralpatni', 'URL:https://www.linkedin.com/in/viral-patni-0a103a319', 'END:VCARD'].join('\n');
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'viral-patni.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  const submitContact = (event: React.FormEvent) => {
    event.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) { setContactStatus('error'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactForm.email)) { setContactStatus('error'); return; }
    setContactStatus('sending');
    window.setTimeout(() => {
      setContactStatus('sent');
      setContactForm({ name: '', email: '', message: '' });
      window.setTimeout(() => setContactStatus('idle'), 3500);
    }, 900);
  };

  const displayRepos = repositories.length ? repositories : curatedProjects;
  const filteredRepos = useMemo(() => {
    const q = projectQuery.trim().toLowerCase();
    let list = displayRepos.filter(repo => {
      const cat = categorize(repo.name, repo.description, repo.language);
      if (projectFilter !== 'all') {
        if (projectFilter === 'fullstack' && cat !== 'fullstack' && cat !== 'general') return false;
        if (projectFilter === 'ai-ml' && cat !== 'ai-ml') return false;
        if (projectFilter === 'dsa' && cat !== 'dsa') return false;
      }
      if (q && !`${repo.name} ${repo.description ?? ''} ${repo.language ?? ''}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (projectSort === 'stars') return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
      if (projectSort === 'name') return a.name.localeCompare(b.name);
      return +new Date(b.updated_at) - +new Date(a.updated_at);
    });
    return list;
  }, [displayRepos, projectFilter, projectQuery, projectSort]);

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.7 } };
  const magnetic = reduceMotion ? {} : {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ''; },
  };
  const spotlight = {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
  };

  const selectedDetail = selectedRepo ? describeRepo(selectedRepo) : null;

  const railSections = [['about', 'About'], ['projects', 'Work'], ['timeline', 'Path'], ['contact', 'Contact']] as const;
  return <main>
    <aside className="abyss-rail" aria-hidden="true"><div className="rail-halo" /><div className="rail-track"><motion.div className="rail-fill" style={{ scaleY: reduceMotion ? 0 : progress }} /></div><div className="rail-word">BUILD · SHIP · LEARN ·</div><div className="rail-ticks">{railSections.map(([id]) => <i key={id} className={activeSection === id ? 'on' : ''} />)}</div></aside>
    <nav className="site-nav">
      <motion.div className="scroll-progress" style={{ scaleX: reduceMotion ? 0 : progress }} aria-hidden="true" />
      <a className="wordmark-simple" href="#top" aria-label="Viral Patni home">Viral <span>Patni</span><i>.</i></a>
      <div className="nav-links">
        <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
        <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Work</a>
        <a href="#timeline" className={activeSection === 'timeline' ? 'active' : ''}>Path</a>
        <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
      </div>
      <div className="nav-actions"><a href="https://github.com/viralpatni" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/viral-patni-0a103a319" target="_blank" rel="noreferrer">LinkedIn ↗</a><button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>{theme === 'dark' ? '☀' : '☾'}</button><button className="nav-resume" type="button" onClick={() => setResumeOpen(true)}>Resume ↗</button></div>
    </nav>

    <section className="hero" id="top">
      <div className="hero-copy">
        <span className="availability-badge"><i />Open to internships · 2026</span>
        <p className="eyebrow">VIRAL PATNI / 01 · CHENNAI, INDIA</p>
        <motion.h1 {...(reduceMotion ? {} : { initial: { opacity: 0, y: 35 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9 } })}>Building <em>useful</em><br />digital things.</motion.h1>
        <div className="role-line" aria-live="polite"><AnimatePresence mode="wait"><motion.span key={role} initial={reduceMotion ? {} : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? {} : { opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>{role}</motion.span></AnimatePresence><span>_</span></div>
        <p className="hero-lede">Full stack developer exploring the intersection of clean code, data, and human-friendly products.</p>
        <div className="hero-cta">
          <a className="button primary magnetic" href="#projects" {...magnetic}>View my work <span>↘</span></a>
          <button className="button secondary magnetic" type="button" onClick={() => setResumeOpen(true)} {...magnetic}>Preview resume <span>↗</span></button>
        </div>
        <div className="hero-meta"><span>Full-Stack · AI/ML · DSA</span><span>VIT Chennai · CSE</span></div>
      </div>

      <div className="hero-studio" aria-label={`Portfolio slideshow: ${currentSlide.title}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="studio-watermark">VP</div>
        <div className="studio-topline"><span>SELECTED WORK / 2026</span><span className="studio-live"><i></i> {currentSlide.image ? 'PERSONAL' : 'AVAILABLE'}</span></div>
        <AnimatePresence mode="wait">
          <motion.div className={`studio-main ${currentSlide.image ? 'studio-profile-slide' : ''}`} key={currentSlide.id} initial={reduceMotion ? {} : { opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? {} : { opacity: 0, x: -28 }} transition={{ duration: 0.4 }}>
            {currentSlide.image && <img className="studio-photo" src={currentSlide.image} alt="Viral Patni outdoors" />}
            <div className="studio-number">{String((activeSlide % studioSlides.length) + 1).padStart(2, '0')}</div>
            <div><span className="studio-eyebrow">{currentSlide.title.toUpperCase()}</span><h2>{currentSlide.image ? <>The person<br /><em>behind the code.</em></> : currentSlide.description}</h2><p>{currentSlide.meta}</p></div>
          </motion.div>
        </AnimatePresence>
        <div className="studio-rail"><span>{String((activeSlide % studioSlides.length) + 1).padStart(2, '0')} / {String(studioSlides.length).padStart(2, '0')}</span><span>PROJECT INDEX</span><span>{currentSlide.image ? 'PORTRAIT' : 'CASE STUDY'}</span>{currentSlide.url ? <a href={currentSlide.url} target="_blank" rel="noreferrer" aria-label={`Open ${currentSlide.title} on GitHub`}>↗</a> : <b>✦</b>}</div>
        <div className="studio-float float-code">const idea = build<span>();</span></div>
        <div className="studio-float float-mark">✦</div>
        <div className="studio-controls">
          <button type="button" onClick={() => setActiveSlide(current => (current - 1 + studioSlides.length) % studioSlides.length)} aria-label="Previous project">←</button>
          <div>{studioSlides.map((slide, index) => <button type="button" className={index === activeSlide % studioSlides.length ? 'active' : ''} key={`${slide.id}-${index}`} onClick={() => setActiveSlide(index)} aria-label={`Show ${slide.title}`} />)}</div>
          <button type="button" onClick={() => setActiveSlide(current => (current + 1) % studioSlides.length)} aria-label="Next project">→</button>
        </div>
      </div>
      <div className="scroll-line">scroll to explore <span /></div>
    </section>

    <section className="intro section" id="about"><motion.div {...reveal} className="section-kicker">02 / ABOUT</motion.div><motion.div {...reveal} className="intro-grid"><h2 key="intro-heading">Technology should feel <em>clear.</em></h2><div key="intro-panel" className="soft-panel"><p>I am a third-year B.Tech Computer Science and Engineering student at VIT Chennai. I specialize in full stack development while exploring Data Science, Artificial Intelligence, and Machine Learning.</p><p>Outside the editor, I practice DSA and lead the Haryana Hood Literary Club. I like useful products, sharp questions, and learning in public.</p><div className="tags"><span>React</span><span>Python</span><span>Data</span><span>DSA</span></div></div></motion.div></section>

    <section className="skills section" id="skills"><motion.div {...reveal} className="section-kicker">03 / THE TOOLKIT</motion.div><div className="skills-heading"><motion.h2 {...reveal}>Tools I use to<br /><em>make things real.</em></motion.h2><p>Skills from my resume, arranged as a working constellation rather than a checklist. Click any card for level + where I use it.</p></div><div className="skill-cloud">{skills.map(([mark, name, tone, icon, description]) => {
      const extra = skillLevels[name];
      const open = expandedSkill === name;
      return <div className={`skill-tile tone-${tone} reveal-card spotlight${open ? ' expanded' : ''}`} key={name} onClick={() => setExpandedSkill(open ? null : name)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpandedSkill(open ? null : name); } }} role="button" tabIndex={0} aria-expanded={open} aria-label={`${name} skill`} {...spotlight}><span className="skill-mark"><img src={`https://cdn.simpleicons.org/${icon}`} alt="" onError={event => { event.currentTarget.style.display = 'none'; }} />{mark}</span><div className="skill-name">{name}</div><p>{description}</p>{open && extra && <div className="skill-extra"><div className="skill-level"><span>{extra.level}</span><span>{extra.pct}%</span></div><div className="skill-bar"><i style={{ width: `${extra.pct}%` }} /></div><small>Used in: {extra.usedIn}</small></div>}</div>;
    })}</div></section>

    <section className="projects section" id="projects">
      <motion.div {...reveal} className="section-kicker">04 / LIVE WORK</motion.div>
      <div className="section-head"><motion.h2 {...reveal}>Built with <em>intent.</em></motion.h2><span className="status">● {githubState === 'ready' ? 'LIVE SYNC' : githubState === 'profile-sync' ? `SYNCED · ${repositories.length} REPOS` : githubState === 'loading' ? 'SYNCING…' : githubState === 'curated' ? 'CURATED' : 'LOADING'}</span></div>
      <div className="project-toolbar">
        <div className="filter-pills" role="tablist" aria-label="Filter projects">
          {(['all', 'fullstack', 'ai-ml', 'dsa'] as ProjectFilter[]).map(f => <button key={f} role="tab" aria-selected={projectFilter === f} className={projectFilter === f ? 'active' : ''} onClick={() => setProjectFilter(f)}>{f === 'all' ? 'All' : f === 'fullstack' ? 'Full-Stack' : f === 'ai-ml' ? 'AI / ML' : 'DSA'}</button>)}
        </div>
        <div className="project-tools">
          <input value={projectQuery} onChange={e => setProjectQuery(e.target.value)} placeholder="Search repos…" aria-label="Search repositories" />
          <select value={projectSort} onChange={e => setProjectSort(e.target.value as 'updated' | 'stars' | 'name')} aria-label="Sort repositories"><option value="updated">Updated</option><option value="stars">Stars</option><option value="name">Name</option></select>
        </div>
      </div>
      <p className="project-count" aria-live="polite">{githubState === 'loading' ? 'Syncing GitHub…' : `${filteredRepos.length} of ${displayRepos.length} repos · click a card for case study`}{githubState !== 'loading' && githubState !== 'ready' && githubState !== 'profile-sync' && <button type="button" className="link-button" onClick={loadRepos}> · Retry sync</button>}</p>
      <div className="repo-grid">
        {githubState === 'loading' ? [1, 2, 3].map(item => <div className="repo-skeleton" key={`skeleton-${item}`} />)
          : filteredRepos.length ? filteredRepos.map(repo => (
            <div className="repo-card reveal-card spotlight" key={`repo-${repo.id}`} onClick={() => setSelectedRepo(repo)} onKeyDown={e => { if (e.key === 'Enter') setSelectedRepo(repo); }} role="button" tabIndex={0} aria-label={`Open case study for ${repo.name}`} {...spotlight}>
              <div className="repo-top"><span className="language-dot" />{repo.language ?? 'Repository'}<span className="stars">★ {repo.stargazers_count}</span></div>
              <h3>{repo.name.replaceAll('-', ' ')}</h3>
              <p>{repo.description ?? 'A GitHub repository by Viral Patni.'}</p>
              <small>Updated {new Date(repo.updated_at).toLocaleDateString()} · Case study ↗</small>
              <div className="repo-links" onClick={e => e.stopPropagation()}><a href={repo.html_url} target="_blank" rel="noreferrer">Code ↗</a>{repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer">Demo ↗</a>}</div>
            </div>
          ))
          : <div className="repo-empty" key="repo-empty">No repos match. <button type="button" className="link-button" onClick={() => { setProjectQuery(''); setProjectFilter('all'); }}>Reset filters</button> · <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">View profile ↗</a></div>}
      </div>
    </section>

    <section className="terminal-section section" id="terminal"><div className="section-kicker">05 / TERMINAL</div><div className="terminal-layout"><div><h2>Ask the<br /><em>command line.</em></h2><p>A tiny interface for a little more context. Try <code>help</code>, <code>goto projects</code>, ↑/↓ for history.</p></div><div className="terminal"><div className="terminal-bar"><span>viral@portfolio:~</span><span>⌘ K</span></div><div className="terminal-output" ref={terminalOutputRef}>{terminal.map((line, index) => <div key={`term-${index}`}>{line}</div>)}</div><div className="terminal-input"><span>›</span><input value={command} onChange={event => setCommand(event.target.value)} onKeyDown={onTerminalKey} placeholder="type a command" aria-label="Terminal command" /></div></div></div></section>

    <section className="timeline section" id="timeline">
      <motion.div {...reveal} className="section-kicker">06 / THE PATH</motion.div>
      <h2>Still <em>becoming.</em></h2>
      <div className="timeline-list">
        {milestones.map((m, i) => (
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : i * 0.06 }}
            className={`timeline-row reveal-card${m.tag === 'In progress' ? ' timeline-now' : ''}`}
            key={`${m.year}-${m.title}-${i}`}
          >
            <span key="year">{m.year}</span>
            <div key="details">
              <div className="timeline-tags">
                <strong>{m.title}</strong>
                <span className={`tag tag-${m.tag.toLowerCase().replace(' ', '-')}`}>{m.tag}</span>
              </div>
              {m.detail && <p>{m.detail}</p>}
              {m.stack && <small className="timeline-stack">{m.stack}</small>}
              {m.url && <a className="timeline-link" href={m.url} target="_blank" rel="noreferrer">View ↗</a>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="contact section" id="contact">
      <motion.div {...reveal} className="contact-card">
        <div key="contact-body"><div className="section-kicker">07 / SAY HELLO</div><h2>Have a good<br /><em>problem?</em></h2><p>Tell me what you are working on. I am always up for a thoughtful conversation.</p>
          <div className="contact-buttons"><button className="email-button" onClick={copyEmail}>{copied ? 'Copied email ✓' : `${email} · Copy`}</button><a className="email-button" href={`mailto:${email}`}>Write email ↗</a><button className="email-button" onClick={downloadVCard}>vCard ↓</button></div>
          <form className="contact-form" onSubmit={submitContact}>
            <label><span>Name</span><input value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" aria-label="Your name" /></label>
            <label><span>Email</span><input value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" aria-label="Your email" /></label>
            <label><span>Message</span><textarea value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Start a conversation…" rows={3} aria-label="Your message" /></label>
            <button className="button primary" type="submit" disabled={contactStatus === 'sending'}>{contactStatus === 'sending' ? 'Sending…' : contactStatus === 'sent' ? 'Sent ✓ — I reply fast' : 'Send message ↗'}</button>
            {contactStatus === 'error' && <small className="form-error">Add a valid name, email, and message.</small>}
            {contactStatus === 'sent' && <small className="form-ok">Saved locally — wire Resend/Formspree later for delivery.</small>}
          </form>
        </div>
        <div key="contact-actions" className="contact-actions"><button className="button primary" type="button" onClick={() => setResumeOpen(true)}>Resume preview ↗</button><a className="button secondary" href={resumePath} download>Download PDF ↓</a><a className="button secondary" href="https://www.linkedin.com/in/viral-patni-0a103a319" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </motion.div>
    </section>

    <footer><span>© {new Date().getFullYear()} Viral Patni · {repositories.length ? `${repositories.length} repos live` : 'curated projects shown'}</span><a href="#top">Back to top ↑</a></footer>

    <AnimatePresence>
      {selectedRepo && selectedDetail && (
        <div key={`modal-${selectedRepo.id}`} className="case-modal" role="dialog" aria-modal="true" aria-labelledby="case-title">
          <button className="resume-backdrop" type="button" aria-label="Close case study" onClick={() => setSelectedRepo(null)} />
          <motion.div className="case-panel" initial={reduceMotion ? {} : { opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.3 }}>
            <header><strong id="case-title">{selectedRepo.name.replaceAll('-', ' ')}</strong><button type="button" onClick={() => setSelectedRepo(null)} aria-label="Close">×</button></header>
            <div className="case-meta"><span>{selectedRepo.language ?? 'Repository'}</span><span>★ {selectedRepo.stargazers_count}</span>{typeof selectedRepo.forks_count === 'number' && <span>⑂ {selectedRepo.forks_count}</span>}<span>Updated {new Date(selectedRepo.updated_at).toLocaleDateString()}</span></div>
            <div className="case-grid">
              <div><h4>Problem</h4><p>{selectedDetail.problem}</p></div>
              <div><h4>Solution</h4><p>{selectedDetail.solution}</p></div>
              <div><h4>Stack</h4><p>{selectedDetail.stack}</p></div>
              <div><h4>Learned</h4><p>{selectedDetail.learned}</p></div>
            </div>
            <div className="case-actions"><a className="button primary" href={selectedRepo.html_url} target="_blank" rel="noreferrer">View code ↗</a>{selectedRepo.homepage && <a className="button secondary" href={selectedRepo.homepage} target="_blank" rel="noreferrer">Live demo ↗</a>}<a className="button secondary" href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">Profile ↗</a></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {resumeOpen && <div className="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title"><button className="resume-backdrop" type="button" aria-label="Close resume preview" onClick={() => setResumeOpen(false)} /><div className="resume-panel"><header><strong id="resume-title">Viral Patni · Resume</strong><div><a href={resumePath} download>Download ↓</a><button type="button" onClick={() => setResumeOpen(false)} aria-label="Close resume preview">×</button></div></header><iframe title="Viral Patni resume preview" src={resumePath} /></div></div>}
  </main>;
}
