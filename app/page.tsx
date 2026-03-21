import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="paper-wrapper">
        <main
          className="paper-sheet"
          style={{
            minHeight: '100vh',
            paddingRight: 'clamp(1rem, 4vw, 3.5rem)',
            paddingLeft: '2.5rem',
          }}
        >
          <Hero />
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule-line)', margin: '0 1rem' }} />
          <Experience />
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule-line)', margin: '0 1rem' }} />
          <Projects />
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule-line)', margin: '0 1rem' }} />
          <Education />
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule-line)', margin: '0 1rem' }} />
          <Skills />
          <hr style={{ border: 'none', borderTop: '1px solid var(--rule-line)', margin: '0 1rem' }} />
          <Contact />
        </main>
      </div>
    </>
  )
}
