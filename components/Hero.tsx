export default function Hero() {
  return (
    <section id="hero" className="px-8 md:px-16 py-16 md:py-24">
      <div className="max-w-2xl">
        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            color: 'var(--ink)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
          }}
        >
          Arjay Andal
        </h1>

        {/* Title */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '1.5rem',
            letterSpacing: '0.03em',
          }}
        >
          Software Developer &nbsp;·&nbsp;
          <a
            href="mailto:rj.andal.cs@gmail.com"
            style={{ fontWeight: 400, fontSize: '1rem', color: 'var(--ink-muted)', letterSpacing: 'normal' }}
          >
            rj.andal.cs@gmail.com
          </a>
        </p>

        {/* Location */}
        <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        </p>

        {/* Intro */}
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--ink)',
            lineHeight: 1.8,
            maxWidth: '56ch',
            marginBottom: '2.5rem',
          }}
        >
          I&apos;m a Software Developer who enjoys building things that are fast, thoughtful, and
          actually useful. I&apos;ve worked across the stack, from React frontends to Python and Node.js
          backends to AWS deployments. I care a lot about the results and details.
        </p>

        {/* Fun fact */}
        <div
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            background: 'transparent',
            border: '1px dashed var(--rule-line)',
            borderRadius: '4px',
            maxWidth: '56ch',
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.25rem' }}>
            ✦ fun fact
          </span>
          <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            I lived and studied in Tokyo, Japan for 4 months as part of an exchange program
            with Sophia University. Best ramen of my life. 🍜
          </p>
        </div>
      </div>
    </section>
  )
}
