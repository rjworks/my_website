export default function Education() {
  return (
    <section id="education" className="px-8 md:px-16 py-16 md:py-24">
      <h2 className="section-heading">Education</h2>

      <div className="max-w-2xl">
        <div
          style={{
            border: '1px solid var(--rule-line)',
            borderRadius: '6px',
            padding: '1.25rem 1.5rem',
            background: 'var(--paper)',
            boxShadow: '0 1px 6px var(--shadow)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)' }}>
                Bachelor of Science in Computer Science
              </h3>
              <p style={{ color: 'var(--accent)', fontWeight: 600, marginTop: '0.2rem' }}>
                University of British Columbia
              </p>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
              June 2025
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
