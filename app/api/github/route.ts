export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const fallbackRepos = [
  { id: 9002, name: 'DSA', description: 'Solving and storing LeetCode and competitive programming solutions with optimal time & space complexity.', language: 'C++', stargazers_count: 0, updated_at: '2026-09-19T13:24:05Z', html_url: 'https://github.com/viralpatni/DSA', homepage: null },
  { id: 9003, name: 'LogiSync', description: 'Logistics sync dashboard in progress — tracking, status workflow, and clean data views.', language: 'TypeScript', stargazers_count: 0, updated_at: '2026-09-18T03:57:54Z', html_url: 'https://github.com/viralpatni/LogiSync', homepage: null },
  { id: 9004, name: 'NorthPeak-Digital', description: 'Internship task — polished web experience built around clear hierarchy, fluid motion, and product thinking.', language: 'JavaScript', stargazers_count: 0, updated_at: '2026-07-26T04:28:42Z', html_url: 'https://github.com/viralpatni/NorthPeak-Digital', homepage: null },
  { id: 9005, name: 'fathers-day', description: 'A thoughtful celebration website with a personal visual direction, responsive layout, and animations.', language: 'TypeScript', stargazers_count: 0, updated_at: '2026-06-21T04:38:12Z', html_url: 'https://github.com/viralpatni/fathers-day', homepage: null },
  { id: 9006, name: 'my-personal-portfolio', description: 'Personal resume website shaped into an expressive, interactive portfolio system.', language: 'HTML', stargazers_count: 0, updated_at: '2026-06-04T10:45:38Z', html_url: 'https://github.com/viralpatni/my-personal-portfolio', homepage: null },
  { id: 9007, name: 'smart-dhobi', description: 'Practical web product for laundry bookings, order tracking, and everyday utility.', language: 'JavaScript', stargazers_count: 0, updated_at: '2026-04-05T17:55:13Z', html_url: 'https://github.com/viralpatni/smart-dhobi', homepage: null },
  { id: 9008, name: 'campus360-redo', description: 'Modernized comprehensive campus platform for student utility, scheduling, and academic resources.', language: 'HTML', stargazers_count: 0, updated_at: '2026-04-01T09:40:40Z', html_url: 'https://github.com/viralpatni/campus360-redo', homepage: null },
];

export async function GET() {
  const username = 'viralpatni';
  const token = process.env.GITHUB_TOKEN;

  // 1. Try official GitHub REST API
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'PortfolioSync/1.0',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return Response.json({ repos: data, source: 'api', cachedAt: new Date().toISOString() }, { status: 200 });
      }
    }
  } catch {
    // Continue to fallback
  }

  // 2. Fallback: Parse public GitHub profile page (bypasses unauthenticated API rate-limit)
  try {
    const profileRes = await fetch(`https://github.com/${username}?tab=repositories`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    });
    if (profileRes.ok) {
      const html = await profileRes.text();
      const blocks = html.split('itemprop="owns"');
      const parsed = [];
      let idCounter = 1000;
      for (let i = 1; i < blocks.length; i++) {
        const block = blocks[i];
        const nameMatch = block.match(new RegExp(`href="/${username}/([^"/]+)"`));
        const descMatch = block.match(/itemprop="description">([\s\S]*?)<\/p>/);
        const langMatch = block.match(/itemprop="programmingLanguage">([^<]+)<\/span>/);
        const updatedMatch = block.match(/datetime="([^"]+)"/);
        const starMatch = block.match(new RegExp(`href="/${username}/[^/]+/stargazers"[^>]*>\\s*([\\d,]+)`));

        if (nameMatch) {
          const name = nameMatch[1].trim();
          if (!name.includes('?') && name !== `${username}.github.io`) {
            parsed.push({
              id: ++idCounter,
              name,
              description: descMatch ? descMatch[1].trim().replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>') : null,
              language: langMatch ? langMatch[1].trim() : null,
              updated_at: updatedMatch ? updatedMatch[1] : new Date().toISOString(),
              stargazers_count: starMatch ? parseInt(starMatch[1].replace(/,/g, ''), 10) : 0,
              html_url: `https://github.com/${username}/${name}`,
              homepage: null,
            });
          }
        }
      }
      if (parsed.length > 0) {
        return Response.json({ repos: parsed, source: 'profile-sync', cachedAt: new Date().toISOString() }, { status: 200 });
      }
    }
  } catch {
    // Continue to static curated fallback
  }

  // 3. Guaranteed reliable fallback: all 8 real repos
  return Response.json({ repos: fallbackRepos, source: 'curated', cachedAt: new Date().toISOString() }, { status: 200 });
}
