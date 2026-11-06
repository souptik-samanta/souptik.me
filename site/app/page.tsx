import Portfolio from './portfolio';

// Static page, rebuilt in the background at most once an hour (ISR).
export const revalidate = 3600;

async function getStars(): Promise<{ stars: Record<string, number>; repos: number | null }> {
  try {
    const res = await fetch('https://api.github.com/users/souptik-samanta/repos?per_page=100', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { stars: {}, repos: null };
    const list: { name: string; stargazers_count: number }[] = await res.json();
    return { stars: Object.fromEntries(list.map((r) => [r.name, r.stargazers_count])), repos: list.length };
  } catch {
    return { stars: {}, repos: null };
  }
}

export default async function Page() {
  const { stars, repos } = await getStars();
  return <Portfolio liveStars={stars} repoCount={repos} />;
}
