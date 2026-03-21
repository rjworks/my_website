'use client'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C#', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React', 'Angular', 'Node.js', 'ASP.NET Core', 'Next.js', 'Qt'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS Lambda', 'AWS EC2', 'AWS S3', 'Docker', 'CI/CD', 'Azure'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'SQL Server', 'SQLite', 'MongoDB'],
  },
  {
    category: 'Testing',
    skills: ['unittest', 'Jest', 'REST APIs'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Linux', 'Jira', 'Confluence', 'Cursor', 'Copilot', 'Claude'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="px-8 md:px-16 py-16 md:py-24">
      <h2 className="section-heading">Skills</h2>

      <div className="flex flex-col gap-6 max-w-2xl">
        {skillGroups.map(({ category, skills }) => (
          <div key={category}>
            <p
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--ink-muted)',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.82rem',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--rule-line)',
                    borderRadius: '4px',
                    color: 'var(--ink)',
                    transition: 'border-color 0.15s ease, color 0.15s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--accent)'
                    el.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--rule-line)'
                    el.style.color = 'var(--ink)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
