import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '👤',
    title: 'Student Dashboard',
    desc: 'Manage your profile, applications and placement journey.',
    color: '#2563EB',
    bg: '#EFF6FF',
  },
  {
    icon: '💼',
    title: 'Job Opportunities',
    desc: 'Explore latest job openings from top companies.',
    color: '#059669',
    bg: '#ECFDF5',
  },
  {
    icon: '📄',
    title: 'ATS Resume Analyzer',
    desc: 'Optimize your resume and improve your chances of getting shortlisted.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: '📋',
    title: 'Application Tracking',
    desc: 'Track your applications and stay updated in real-time.',
    color: '#DC2626',
    bg: '#FEF2F2',
  },
  {
    icon: '📅',
    title: 'Interview Scheduling',
    desc: 'Book and manage your interviews with ease.',
    color: '#D97706',
    bg: '#FFFBEB',
  },
  {
    icon: '📊',
    title: 'Placement Analytics',
    desc: 'View insights and track placement performance.',
    color: '#0891B2',
    bg: '#ECFEFF',
  },
]

const STEPS = [
  { num: '1', icon: '👤', title: 'Create Your Profile', desc: 'Sign up and complete your profile with your details.' },
  { num: '2', icon: '🔍', title: 'Explore Opportunities', desc: 'Browse through the latest job openings from top companies.' },
  { num: '3', icon: '📝', title: 'Apply & Track', desc: 'Submit your applications and track your progress.' },
  { num: '4', icon: '⭐', title: 'Get Placed', desc: 'Attend interviews and secure your dream job.' },
]

/* ---------- Intersection Observer hook for scroll animations ---------- */
function useOnScreen(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.12, ...options })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useOnScreen()
  return (
    <div
      ref={ref}
      className={`anim-section ${visible ? 'anim-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  useEffect(() => { document.title = 'Placement Management System — Home' }, [])

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hp-hero">
        <div className="container">
          <div className="hp-hero-card">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <AnimatedSection>
                  <span className="hp-badge-pill">Your Career • Our Priority</span>
                  <h1 className="hp-hero-title">
                    Placement Management System for a{' '}
                    <span className="hp-gradient-text">Brighter Future</span>
                  </h1>
                  <p className="hp-hero-sub">
                    Connect, Apply, Grow. Our platform helps students find the right opportunities,
                    track applications and build a successful career with ease.
                  </p>
                  <div className="hp-hero-actions">
                    <Link to="/register" className="btn btn-primary btn-lg hp-btn-glow">
                      Get Started <span aria-hidden="true">→</span>
                    </Link>
                    <Link to="/jobs" className="btn btn-outline-primary btn-lg">
                      Explore Jobs
                    </Link>
                  </div>
                </AnimatedSection>
              </div>

              <div className="col-lg-6">
                <AnimatedSection delay={200}>
                  <div className="hp-hero-visual">
                    <img
                      src="/hero-illustration.svg"
                      alt="Career placement illustration showing a person working on a laptop with analytics"
                      className="hp-hero-img"
                      width="560"
                      height="420"
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section className="hp-stats">
        <div className="container">
          <div className="row g-3">
            {[
              { icon: '💼', value: '500+', label: 'Active Job Opportunities' },
              { icon: '🏢', value: '100+', label: 'Hiring Companies' },
              { icon: '👥', value: '800+', label: 'Students Placed' },
              { icon: '📈', value: '95%', label: 'Placement Success Rate' },
            ].map((s, i) => (
              <div key={s.label} className="col-6 col-lg-3">
                <AnimatedSection delay={i * 100}>
                  <div className="hp-stat-card">
                    <div className="hp-stat-icon">{s.icon}</div>
                    <div>
                      <div className="hp-stat-value">{s.value}</div>
                      <div className="hp-stat-label">{s.label}</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section className="hp-features">
        <div className="container">
          <AnimatedSection>
            <div className="hp-section-header">
              <span className="hp-kicker">Our Features</span>
              <h2 className="hp-section-title">Everything You Need for a Successful Placement</h2>
              <p className="hp-section-sub">
                Powerful tools to help students, recruiters and placement cells work together efficiently.
              </p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="col-md-6 col-lg-4">
                <AnimatedSection delay={i * 80}>
                  <div className="hp-feature-card">
                    <div className="hp-feature-icon" style={{ background: f.bg, color: f.color }}>
                      <span>{f.icon}</span>
                    </div>
                    <h3 className="hp-feature-title">{f.title}</h3>
                    <p className="hp-feature-desc">{f.desc}</p>
                    <span className="hp-feature-arrow" style={{ color: f.color }}>→</span>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────── */}
      <section className="hp-how">
        <div className="container">
          <AnimatedSection>
            <div className="hp-section-header">
              <span className="hp-kicker">How It Works</span>
              <h2 className="hp-section-title">Get Placed in 4 Simple Steps</h2>
              <p className="hp-section-sub">Follow these simple steps to kickstart your career journey.</p>
            </div>
          </AnimatedSection>

          <div className="row g-4 hp-steps-row">
            {STEPS.map((step, i) => (
              <div key={step.num} className="col-md-6 col-lg-3">
                <AnimatedSection delay={i * 120}>
                  <div className="hp-step-card">
                    <div className="hp-step-top">
                      <span className="hp-step-num">{step.num}</span>
                      <span className="hp-step-icon">{step.icon}</span>
                    </div>
                    {i < STEPS.length - 1 && <span className="hp-step-arrow d-none d-lg-block">→</span>}
                    <h4 className="hp-step-title">{step.title}</h4>
                    <p className="hp-step-desc">{step.desc}</p>
                  </div>
                </AnimatedSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="hp-cta">
        <div className="container">
          <AnimatedSection>
            <div className="hp-cta-card">
              <h2 className="hp-cta-title">Ready to Launch Your Career?</h2>
              <p className="hp-cta-sub">
                Join hundreds of students who found their dream job through our placement portal.
              </p>
              <div className="hp-cta-actions">
                <Link to="/register" className="btn btn-primary btn-lg hp-btn-glow">
                  Create Your Account
                </Link>
                <Link to="/about" className="btn btn-outline-primary btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
