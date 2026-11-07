'use client';

import { useState } from 'react';
import Image from 'next/image';
import { categories, featured, projects, skillGroups, testimonials, type Project } from './data';

const mono = 'font-mono text-[13px] tracking-tight';

function Rule({ label }: { label: string }) {
  return (
    <div className="mb-8 mt-24 flex items-center gap-4 border-t-2 border-ink pt-3">
      <h2 className={`${mono} uppercase tracking-[0.18em]`}>{label}</h2>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  return (
    <span className={`${mono} flex flex-wrap gap-x-5 gap-y-1`}>
      <a className="u" href={p.repo} target="_blank" rel="noreferrer">source</a>
      {p.link && (
        <a className="u" href={p.link.href} target="_blank" rel="noreferrer">
          {p.link.label.toLowerCase()}
        </a>
      )}
    </span>
  );
}

const Portfolio = ({ liveStars, repoCount }: { liveStars: Record<string, number>; repoCount: number | null }) => {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');

  const withStars = (p: Project): Project => {
    const name = p.repo.split('/').pop() ?? '';
    return { ...p, stars: liveStars[name] ?? p.stars };
  };
  const shown = (filter === 'All' ? projects : projects.filter((p) => p.category === filter)).map(withStars);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-10 pt-8 sm:px-10">
      <header className={`${mono} flex items-center justify-between`}>
        <a href="#top" className="font-bold">souptik.me</a>
        <nav className="flex gap-5">
          <a className="u" href="#made">things i made</a>
          <a className="u" href="#about">about</a>
          <a className="u" href="#contact">contact</a>
        </nav>
      </header>

      <section id="top" className="pb-6 pt-24 sm:pt-32">
        <p className={`${mono} mb-5 text-mute`}>Kolkata, India &middot; 17 &middot; rev. {new Date().getFullYear()}</p>
        <h1 className="text-6xl font-medium leading-[0.95] tracking-tight sm:text-8xl">
          Souptik
          <br />
          Samanta<span className="text-rust">.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-2xl leading-snug sm:text-[28px]">
          I design circuit boards, build 3D printers and write the firmware that runs on them. I started with HTML
          at eleven and haven&rsquo;t stopped making things since.
        </p>
        <p className={`${mono} mt-8 flex flex-wrap gap-x-6 gap-y-2`}>
          <a className="u" href="https://github.com/souptik-samanta">github</a>
          <a className="u" href="https://www.instagram.com/souptik.me">instagram</a>
          <a className="u" href="mailto:me@souptik.me">me@souptik.me</a>
        </p>
      </section>

      <section id="made">
        <Rule label="Things I made" />

        <ol>
          {featured.map(withStars).map((p, i) => (
            <li key={p.title} className="grid gap-x-8 gap-y-2 border-b border-ink/25 py-8 sm:grid-cols-[4.5rem_1fr]">
              <span className={`${mono} pt-2 text-rust`}>U{i + 1}</span>
              <div>
                <h3 className="text-4xl font-medium leading-none tracking-tight">{p.title}</h3>
                <p className={`${mono} mt-3 text-mute`}>
                  {p.tech.join(' / ')} &middot; {p.year}
                  {p.stars ? ` · ${p.stars} stars` : ''}
                </p>
                <p className="mt-4 max-w-2xl">{p.desc}</p>
                <div className="mt-4">
                  <Links p={p} />
                </div>
                {p.img && (
                  <figure className="mt-6 max-w-xl">
                    <Image
                      src={p.img.src}
                      alt={p.img.alt}
                      width={p.img.w}
                      height={p.img.h}
                      sizes="(min-width: 768px) 576px, 100vw"
                      className="w-full border-2 border-ink bg-white"
                    />
                    <figcaption className={`${mono} mt-2 text-mute`}>Fig. {i + 1} &mdash; {p.img.caption}</figcaption>
                  </figure>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mb-4 mt-14 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-2xl font-medium">Smaller things</h3>
          <div className={`${mono} flex flex-wrap gap-x-4 gap-y-1`}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={filter === c ? 'font-bold underline decoration-2 underline-offset-4' : 'text-mute hover:text-ink'}
              >
                {c.toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <ul className="border-t border-ink/25">
          {shown.map((p) => (
            <li
              key={p.title}
              className={`grid gap-x-6 gap-y-2 border-b border-ink/25 py-4 ${
                p.img ? 'sm:grid-cols-[9rem_1fr_auto]' : 'sm:grid-cols-[1fr_auto]'
              }`}
            >
              {p.img && (
                <Image
                  src={p.img.src}
                  alt={p.img.alt}
                  width={p.img.w}
                  height={p.img.h}
                  sizes="144px"
                  className="h-24 w-full border border-ink object-cover sm:w-36"
                />
              )}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-xl font-medium">{p.title}</span>
                  <span className={`${mono} text-mute`}>{p.tech.join(', ')}</span>
                </div>
                <p className="text-base text-ink/80">{p.desc}</p>
              </div>
              <div className={`${mono} flex items-start gap-5 sm:flex-col sm:items-end sm:gap-1`}>
                <span className="text-mute">{p.year}</span>
                <Links p={p} />
              </div>
            </li>
          ))}
        </ul>
        <p className={`${mono} mt-6`}>
          Plus {repoCount ? `${repoCount}+` : 'a lot of'} repos of half-finished experiments on{' '}
          <a className="u" href="https://github.com/souptik-samanta?tab=repositories">github</a>.
        </p>
      </section>

      <section id="about">
        <Rule label="About" />
        <div className="max-w-2xl space-y-5">
          <p>
            I&rsquo;m 17 and live in Kolkata. Six years ago I made my first web page; now most of what I make ends up
            on a soldering station. The 3D printer on this page, Chaos Compiler, I designed myself and it still
            surprises me that it prints.
          </p>
          <p>
            A lot of my projects come through{' '}
            <a className="u" href="https://hackclub.com">Hack Club</a>, where I&rsquo;ve built for Infill, OnBoard and
            Blueprint, and where I review other teenagers&rsquo; projects as a volunteer.
          </p>
          <p>
            Lately I&rsquo;m into small, low-power boards (STM32, LoRa) and low-level code. Next I want to get
            properly into machine learning and security.
          </p>
          <p className="border-l-2 border-rust pl-5 italic">
            &ldquo;A good world is where learning is available to all, no matter what their age, gender, creed or
            race is.&rdquo;
          </p>
        </div>

        <h3 className="mb-3 mt-14 text-2xl font-medium">What I use</h3>
        <dl className="max-w-2xl border-t border-ink/25">
          {skillGroups.map((g) => (
            <div key={g.name} className="grid gap-1 border-b border-ink/25 py-3 sm:grid-cols-[8rem_1fr]">
              <dt className={`${mono} text-mute`}>{g.name.toLowerCase()}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mb-3 mt-14 text-2xl font-medium">People say</h3>
        <div className="grid gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name}>
              <blockquote className="italic">&ldquo;{t.text}&rdquo;</blockquote>
              <figcaption className={`${mono} mt-2 text-mute`}>
                {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact">
        <Rule label="Contact" />
        <p className="max-w-xl text-2xl leading-snug">
          Want to talk about a board, a printer, or something you&rsquo;re building? Write to me at{' '}
          <a className="u text-mask" href="mailto:me@souptik.me">me@souptik.me</a>.
        </p>
      </section>

      <footer className={`${mono} mt-24 flex flex-wrap justify-between gap-2 border-t border-ink/25 pt-4 text-mute`}>
        <span>&copy; {new Date().getFullYear()} Souptik Samanta</span>
        <span>Made in Kolkata. Soldered by hand.</span>
      </footer>
    </div>
  );
};

export default Portfolio;
