const experiences = [
  {
    role: 'Software Developer I',
    company: 'Siemens EDA',
    period: 'Jul 2025 – Present',
    tech: ['Python', 'C++', 'Linux', 'Git', 'Jira'],
    summary:
      'Working on EDA tools like Solido Design Environment — improving simulation performance, data export pipelines, and AI tooling for 10,000+ customers worldwide.',
  },
  {
    role: 'Software Developer Intern',
    company: 'Intuit',
    period: 'Jan 2023 – Aug 2023',
    tech: ['JavaScript', 'React', 'Node.js', 'AWS Lambda', 'Git'],
    summary:
      'Built features for QuickBooks Online, including a drag-and-drop page builder and a serverless AWS Lambda tool that saved 100+ developers over 10 hours per week.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-8 md:px-16 py-16 md:py-24">
      <h2 className="section-heading">Experience</h2>

      <div className="flex flex-col gap-10 max-w-2xl">
        {experiences.map((exp, i) => (
          <div key={i}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {exp.role}
                </span>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}> · {exp.company}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                {exp.period}
              </span>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, marginBottom: '0.75rem' }}>
              {exp.summary}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.15rem 0.55rem',
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
