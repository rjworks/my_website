const projects = [
  {
    title: 'Reddit Stock Sentiment Analyzer',
    type: 'Personal Project',
    period: null,
    tech: ['Python', 'Reddit API', 'Discord API', 'AI/LLM'],
    summary:
      'An automated pipeline that scrapes stock subreddits daily, generates AI-powered trade recommendations from aggregated sentiment, and delivers alerts via Discord.',
    highlight: '30%+ positive returns on options trading.',
  },
  {
    title: 'CharityK',
    type: 'Contract — Kelowna Software',
    period: 'Sep 2024 – Apr 2025',
    tech: ['TypeScript', 'Angular', 'C#', 'ASP.NET Core', 'SQL Server', 'Docker', 'Azure'],
    summary:
      'A platform connecting businesses to charities and making impactful contributions — full-stack app with Angular frontend and ASP.NET Core backend, deployed on Azure.',
    highlight: '50% faster page loads.',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 py-16 md:py-24">
      <h2 className="section-heading">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {projects.map((proj, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--rule-line)',
              borderRadius: '6px',
              padding: '1.25rem 1.5rem',
              background: 'var(--paper)',
              boxShadow: '0 1px 6px var(--shadow)',
            }}
          >
            {/* Badge */}
            <span
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--accent)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.4rem',
              }}
            >
              {proj.type}
            </span>

            {/* Title */}
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.25rem' }}>
              {proj.title}
            </h3>

            {/* Period */}
            {proj.period && (
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '0.75rem' }}>
                {proj.period}
              </p>
            )}

            {/* Summary */}
            <p style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
              {proj.summary}
            </p>

            {/* Highlight */}
            <p style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '1rem' }}>
              ✦ {proj.highlight}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.5rem',
                    border: '1px solid var(--rule-line)',
                    borderRadius: '999px',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
