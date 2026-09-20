export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const fallbackRepos = [
  { id: 9002, name: 'DSA', description: 'Solving and storing LeetCode and competitive programming solutions with optimal time & space complexity.', language: 'C++', stargazers_count: 0, updated_at: '2026-09-19T13:24:05Z', html_url: 'https://github.com/viralpatni/DSA', homepage: null },
  { id: 9003, name: 'LogiSync', description: 'Logistics sync dashboard in progress — tracking, status workflow, and clean data views.', language: 'TypeScript', stargazers_count: 0, updated_at: '2026-09-18T03:57:54Z', html_url: 'https://github.com/viralpatni/LogiSync', homepage: null },
  { id: 9004, name: 'NorthPeak-Digital', description: 'Internship task — polished web experience built around clear hierarchy, fluid motion, and product thinking.', language: 'JavaScript', stargazers_count: 0, updated_at: '2026-07-26T04:28:42Z', html_url: 'https://github.com/viralpatni/NorthPeak-Digital', homepage: null },
  { id: 9005, name: 'fathers-day', description: 'A thoughtful celebration website with a personal visual direction, responsive layout, and animations.', language: 'TypeScript', stargazers_count: 0, updated_at: '2026-06-21T04:38:12Z', html_url: 'https://github.com/viralpatni/fathers-day', homepage: null },
  { id: 9006, name: 'my-personal-portfolio', description: 'Personal resume website shaped into an expressive, interactive portfolio system.', language: 'HTML', stargazers_count: 0, updated_at: '2026-06-04T10:45:38Z', html_url: 'https://github.com/viralpatni/my-personal-portfolio', homepage: null },
  { id: 9007, name: 'smart-dhobi', description: 'Practical web product for laundry bookings, order tracking, and everyday utility.', language: 'JavaScript', stargazers_count: 0, updated_at: '2026-04-05T17:55:13Z', html_url: 'https://github.com/viralpatni/smart-dhobi', homepage: null },
  { id: 9008, name: 'campus360-redo', description: 'Modernized campus platform for student utility, scheduling, and academic resources.', language: 'HTML', stargazers_count: 0, updated_at: '2026-04-01T09:40:40Z', html_url: 'https://github.com/viralpatni/campus360-redo', homepage: null },
];

export async function GET() {
  const username = 'viralpatni';
  const token = process.env.GITHUB_TOKEN;

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'PortfolioSync/1.0',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      const repos = await response.json();
      if (Array.isArray(repos) && repos.length) {
        return Response.json({ repos, source: 'api', cachedAt: new Date().toISOString() });
      }
    }
  } catch {
    // Use the curated list when GitHub is unavailable.
  }

  return Response.json({ repos: fallbackRepos, source: 'curated', cachedAt: new Date().toISOString() });
}