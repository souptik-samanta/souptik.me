'use client';

import { useEffect, useState } from 'react';
import { Github, Instagram, Mail, ExternalLink, Star, ArrowUpRight, Menu, X, Cpu, Printer, Heart } from 'lucide-react';
import { categories, featured, projects, skillGroups, testimonials, type Project } from './data';

const NAV = ['about', 'projects', 'skills', 'words', 'contact'] as const;
const LABEL: Record<(typeof NAV)[number], string> = {
  about: 'About',
  projects: 'Projects',
  skills: 'Skills',
  words: 'Kind words',
  contact: 'Contact',
};

const TYPED = 'const developer = "Souptik Samanta";';

function useTyped(text: string) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 1), 55);
    return () => clearTimeout(t);
  }, [n, text]);
  return text.slice(0, n);
}

function useActiveSection() {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 flex items-baseline gap-4">
      <span className="font-mono text-sm text-amber-400">{index}</span>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{children}</h2>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-white/15 to-transparent sm:block" />
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-zinc-300">
      {children}
    </span>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <a
        href={p.repo}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-amber-400"
      >
        <Github className="h-4 w-4" /> Source
      </a>
      {p.link && (
        <a
          href={p.link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-cyan-300"
        >
          <ExternalLink className="h-4 w-4" /> {p.link.label}
        </a>
      )}
      {p.stars ? (
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-xs text-zinc-500">
          <Star className="h-3.5 w-3.5" /> {p.stars}
        </span>
      ) : null}
    </div>
  );
}

function FeaturedCard({ p, i }: { p: Project; i: number }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-white/10 bg-zinc-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:bg-zinc-900">
      <div className="mb-5 flex items-center justify-between font-mono text-xs text-zinc-500">
        <span>0{i + 1} / {p.category}</span>
        <span>{p.year}</span>
      </div>
      <h3 className="mb-3 flex items-center gap-2 text-2xl font-semibold transition group-hover:text-amber-400">
        {p.title}
        <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
      </h3>
      <p className="mb-6 flex-1 leading-relaxed text-zinc-400">{p.desc}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <Links p={p} />
    </article>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-white/10 bg-zinc-900/40 p-5 transition hover:border-cyan-300/40 hover:bg-zinc-900/80">
      <div className="mb-2 flex items-center justify-between font-mono text-xs text-zinc-500">
        <span>{p.category}</span>
        <span>{p.year}</span>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {p.tech.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <Links p={p} />
    </article>
  );
}

const Portfolio = ({ liveStars, repoCount }: { liveStars: Record<string, number>; repoCount: number | null }) => {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const typed = useTyped(TYPED);
  const active = useActiveSection();

  const withStars = (p: Project): Project => {
    const name = p.repo.split('/').pop() ?? '';
    return { ...p, stars: liveStars[name] ?? p.stars };
  };
  const shown = (filter === 'All' ? projects : projects.filter((p) => p.category === filter)).map(withStars);
  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 font-[family-name:var(--font-geist-sans)] text-zinc-100 selection:bg-amber-400 selection:text-black">
      {/* PCB-grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div aria-hidden className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />

      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-mono text-lg font-bold text-amber-400">
            &lt;souptik /&gt;
          </button>
          <div className="hidden gap-8 md:flex">
            {NAV.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`text-sm transition hover:text-amber-400 ${active === id ? 'text-amber-400' : 'text-zinc-400'}`}
              >
                {LABEL[id]}
              </button>
            ))}
          </div>
          <button className="md:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <div className="border-t border-white/10 bg-zinc-950 px-5 py-3 md:hidden">
            {NAV.map((id) => (
              <button key={id} onClick={() => go(id)} className="block w-full py-2.5 text-left text-zinc-300">
                {LABEL[id]}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 pb-16 pt-28">
          <p className="mb-4 font-mono text-sm text-cyan-300">~/souptik $ whoami</p>
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Hi, I'm <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Souptik</span>.
            <br />
            I build hardware and code.
          </h1>
          <p className="mb-3 h-7 font-mono text-zinc-400 md:text-lg">
            {typed}
            <span className="animate-pulse text-amber-400">â–</span>
          </p>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            17-year-old maker from Kolkata, India. I design PCBs, build 3D printers, write firmware and ship
            software. Currently into STM32, LoRa, low-level tech, and learning AI/ML and cybersecurity.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => go('projects')}
              className="rounded-lg bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300"
            >
              See my projects
            </button>
            <button
              onClick={() => go('contact')}
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold transition hover:border-cyan-300 hover:text-cyan-300"
            >
              Get in touch
            </button>
            <div className="ml-2 flex gap-2">
              {[
                { href: 'https://github.com/souptik-samanta', Icon: Github, label: 'GitHub' },
                { href: 'https://www.instagram.com/souptik.me', Icon: Instagram, label: 'Instagram' },
                { href: 'mailto:me@souptik.me', Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} aria-label={label} className="rounded-lg border border-white/10 p-3 text-zinc-400 transition hover:border-amber-400 hover:text-amber-400">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ['17', 'years old'],
              ['6+', 'years coding'],
              [repoCount ? `${repoCount}+` : '100+', 'GitHub repos'],
              ['1', '3D printer built from scratch'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-3xl font-bold text-amber-400">{n}</dt>
                <dd className="text-sm text-zinc-500">{l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle index="01">About</SectionTitle>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="space-y-5 text-lg leading-relaxed text-zinc-400 lg:col-span-3">
              <p>
                I started coding at 11 with HTML. Six years on, I've gone from web pages to custom PCBs, firmware,
                and a 3D printer I designed and built from scratch. I'm 17 now, and most of what I make
                ends up on a soldering station somewhere.
              </p>
              <p>
                A lot of my work comes through <a className="text-amber-400 underline-offset-4 hover:underline" href="https://hackclub.com">Hack Club</a>:
                I've built for programs like Infill, OnBoard and Blueprint, and I volunteer there as a reviewer and developer.
              </p>
              <p>
                I'm especially drawn to low-level, low-power embedded work: the STM32 and LoRa sensor nodes on this
                page are where I'm having the most fun. Next I want to go deeper into AI/ML and cybersecurity.
              </p>
              <blockquote className="border-l-2 border-amber-400 pl-5 italic text-zinc-300">
                "A good world is where learning is available to all, no matter what their age, gender, creed or race is."
              </blockquote>
            </div>
            <div className="space-y-4 lg:col-span-2">
              {[
                { Icon: Cpu, t: 'Custom silicon-adjacent', d: 'STM32, ESP32 and RP2040 boards designed in KiCad, from schematic to assembly.' },
                { Icon: Printer, t: 'Built a 3D printer', d: 'Chaos Compiler: a CoreXY/Cartesian hybrid with Klipper, designed solo.' },
                { Icon: Heart, t: 'Volunteer', d: 'Reviewer and developer at Hack Club, helping other teens ship their projects.' },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex gap-4 rounded-xl border border-white/10 bg-zinc-900/50 p-5">
                  <Icon className="mt-1 h-6 w-6 shrink-0 text-cyan-300" />
                  <div>
                    <h3 className="mb-1 font-semibold">{t}</h3>
                    <p className="text-sm text-zinc-400">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle index="02">Projects</SectionTitle>

          <h3 className="mb-6 font-mono text-sm uppercase tracking-widest text-zinc-500">Featured</h3>
          <div className="mb-20 grid gap-6 md:grid-cols-2">
            {featured.map(withStars).map((p, i) => (
              <FeaturedCard key={p.title} p={p} i={i} />
            ))}
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-500">More builds</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    filter === c
                      ? 'border-amber-400 bg-amber-400 font-semibold text-black'
                      : 'border-white/15 text-zinc-400 hover:border-white/40'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.title} p={p} />
            ))}
          </div>
          {shown.length === 0 && <p className="py-10 text-center text-zinc-500">Nothing here yet.</p>}

          <div className="mt-10 text-center">
            <a
              href="https://github.com/souptik-samanta?tab=repositories"
              className="inline-flex items-center gap-2 text-zinc-400 transition hover:text-amber-400"
            >
              Everything else lives on GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle index="03">Skills</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div key={g.name} className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-amber-400">{g.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="words" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle index="04">Kind words</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-xl border border-white/10 bg-zinc-900/50 p-7">
                <blockquote className="mb-5 text-lg leading-relaxed text-zinc-300">"{t.text}"</blockquote>
                <figcaption>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-cyan-300">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
          <SectionTitle index="05">Contact</SectionTitle>
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-transparent p-10 text-center">
            <h3 className="mb-3 text-3xl font-bold">Got a project, or just want to talk hardware?</h3>
            <p className="mx-auto mb-7 max-w-xl text-zinc-400">
              I'm open to collaborations, feedback on my builds, and anything involving PCBs, firmware or 3D printers.
            </p>
            <a
              href="mailto:me@souptik.me"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-7 py-3 font-semibold text-black transition hover:bg-amber-300"
            >
              <Mail className="h-5 w-5" /> me@souptik.me
            </a>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-zinc-500 sm:flex-row">
          <span>Â© {new Date().getFullYear()} Souptik Samanta. Made in Kolkata.</span>
          <div className="flex gap-5">
            <a href="https://github.com/souptik-samanta" className="hover:text-amber-400">GitHub</a>
            <a href="https://www.instagram.com/souptik.me" className="hover:text-amber-400">Instagram</a>
            <a href="mailto:me@souptik.me" className="hover:text-amber-400">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;

