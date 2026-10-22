import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ---------- Intersection Observer hook for scroll animations ---------- */
function useOnScreen(options) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // If IntersectionObserver is not supported, show immediately
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )

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

export default function About() {
  useEffect(() => {
    document.title = 'About Our Placement Management System'
  }, [])

  return (
    <div className="about-page">
      {/* ── 1. Hero Section ────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-card">
            <AnimatedSection>
              <div className="about-badge">
                <span role="img" aria-label="sparkles">✨</span>
                <span>Next-Generation Campus Recruitment Platform</span>
              </div>
              <h1 className="about-hero-title">
                About Our{' '}
                <span className="about-gradient-text">
                  Placement Management System
                </span>
              </h1>
              <p className="about-hero-lead">
                A unified, intelligent ecosystem bridging the gap between ambitious students,
                esteemed recruiters, and college placement administration. We streamline campus recruitment
                drives with automated application tracking, transparent status updates, and cutting-edge
                career preparation tools.
              </p>

              <div className="about-pills-row">
                <div className="about-pill-item">
                  <span role="img" aria-label="student">🎓</span>
                  <span>Student Centric</span>
                </div>
                <div className="about-pill-item">
                  <span role="img" aria-label="briefcase">💼</span>
                  <span>Recruiter Friendly</span>
                </div>
                <div className="about-pill-item">
                  <span role="img" aria-label="institution">🏛️</span>
                  <span>Centralized Admin Control</span>
                </div>
                <div className="about-pill-item">
                  <span role="img" aria-label="robot">🤖</span>
                  <span>AI-Powered Resume Insights</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 2. Feature Cards for 3 Roles ─────────────────────────── */}
      <section className="about-section">
        <div className="container">
          <AnimatedSection>
            <div className="about-section-header">
              <span className="about-kicker">Triple-Role Architecture</span>
              <h2 className="about-section-title">Built for Every Stakeholder</h2>
              <p className="about-section-sub">
                Designed from the ground up to empower students, facilitate recruiting partners,
                and provide placement officers with full visibility and control.
              </p>
            </div>
          </AnimatedSection>

          <div className="row g-4">
            {/* For Students */}
            <div className="col-lg-4 col-md-6">
              <AnimatedSection delay={100} className="h-100">
                <div
                  className="about-role-card"
                  style={{
                    '--card-accent': 'linear-gradient(90deg, #2563eb, #3b82f6)',
                  }}
                >
                  <div className="about-role-header">
                    <div
                      className="about-role-icon"
                      style={{ background: '#eff6ff', color: '#2563eb' }}
                    >
                      <span role="img" aria-label="student">🎓</span>
                    </div>
                    <span
                      className="about-role-tag"
                      style={{ background: '#eff6ff', color: '#2563eb' }}
                    >
                      For Students
                    </span>
                  </div>

                  <h3 className="about-role-title">Empower Your Career</h3>
                  <p className="about-role-desc">
                    Explore jobs, manage profiles, track applications, and prepare for placements.
                  </p>

                  <ul className="about-role-features">
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#dbeafe', color: '#1d4ed8' }}
                      >
                        ✓
                      </span>
                      <span>Explore verified campus job openings & internship listings</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#dbeafe', color: '#1d4ed8' }}
                      >
                        ✓
                      </span>
                      <span>Build a comprehensive profile with skills and academic records</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#dbeafe', color: '#1d4ed8' }}
                      >
                        ✓
                      </span>
                      <span>Track real-time application stages & interview schedules</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#dbeafe', color: '#1d4ed8' }}
                      >
                        ✓
                      </span>
                      <span>Prepare with AI-assisted resume evaluation & instant feedback</span>
                    </li>
                  </ul>

                  <Link
                    to="/jobs"
                    className="about-role-btn btn btn-outline-primary w-100"
                  >
                    Explore Job Openings <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* For Recruiters */}
            <div className="col-lg-4 col-md-6">
              <AnimatedSection delay={200} className="h-100">
                <div
                  className="about-role-card"
                  style={{
                    '--card-accent': 'linear-gradient(90deg, #7c3aed, #9333ea)',
                  }}
                >
                  <div className="about-role-header">
                    <div
                      className="about-role-icon"
                      style={{ background: '#f5f3ff', color: '#7c3aed' }}
                    >
                      <span role="img" aria-label="briefcase">💼</span>
                    </div>
                    <span
                      className="about-role-tag"
                      style={{ background: '#f5f3ff', color: '#7c3aed' }}
                    >
                      For Recruiters
                    </span>
                  </div>

                  <h3 className="about-role-title">Hire Top Campus Talent</h3>
                  <p className="about-role-desc">
                    Discover eligible candidates and manage recruitment activities.
                  </p>

                  <ul className="about-role-features">
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#ede9fe', color: '#6d28d9' }}
                      >
                        ✓
                      </span>
                      <span>Publish targeted vacancies with specific academic criteria</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#ede9fe', color: '#6d28d9' }}
                      >
                        ✓
                      </span>
                      <span>Filter & discover eligible, verified student candidates easily</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#ede9fe', color: '#6d28d9' }}
                      >
                        ✓
                      </span>
                      <span>Schedule interview rounds and send notifications directly</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#ede9fe', color: '#6d28d9' }}
                      >
                        ✓
                      </span>
                      <span>Streamline hiring pipelines from shortlisting to final offers</span>
                    </li>
                  </ul>

                  <Link
                    to="/recruiter/login"
                    className="about-role-btn btn btn-outline-primary w-100"
                    style={{ borderColor: '#7c3aed', color: '#7c3aed' }}
                  >
                    Recruiter Portal <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>

            {/* For Administrators */}
            <div className="col-lg-4 col-md-12">
              <AnimatedSection delay={300} className="h-100">
                <div
                  className="about-role-card"
                  style={{
                    '--card-accent': 'linear-gradient(90deg, #0284c7, #4f46e5)',
                  }}
                >
                  <div className="about-role-header">
                    <div
                      className="about-role-icon"
                      style={{ background: '#f0f9ff', color: '#0284c7' }}
                    >
                      <span role="img" aria-label="institution">🏛️</span>
                    </div>
                    <span
                      className="about-role-tag"
                      style={{ background: '#f0f9ff', color: '#0284c7' }}
                    >
                      For Administrators
                    </span>
                  </div>

                  <h3 className="about-role-title">Placement Administration</h3>
                  <p className="about-role-desc">
                    Organize students, recruiters, job listings, and placement activities.
                  </p>

                  <ul className="about-role-features">
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#e0f2fe', color: '#0369a1' }}
                      >
                        ✓
                      </span>
                      <span>Verify student credentials, branch eligibility, and profiles</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#e0f2fe', color: '#0369a1' }}
                      >
                        ✓
                      </span>
                      <span>Onboard recruiting companies and approve placement drives</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#e0f2fe', color: '#0369a1' }}
                      >
                        ✓
                      </span>
                      <span>Oversee applications, interview slots, and offer releases</span>
                    </li>
                    <li className="about-role-feature-item">
                      <span
                        className="about-check-icon"
                        style={{ background: '#e0f2fe', color: '#0369a1' }}
                      >
                        ✓
                      </span>
                      <span>Generate detailed placement analytics, reports, and audit logs</span>
                    </li>
                  </ul>

                  <Link
                    to="/admin/login"
                    className="about-role-btn btn btn-outline-primary w-100"
                    style={{ borderColor: '#0284c7', color: '#0284c7' }}
                  >
                    Administrator Portal <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. AI-Powered ATS Resume Analyzer Feature Section ───────── */}
      <section className="about-section pt-0">
        <div className="container">
          <AnimatedSection>
            <div className="about-ats-card">
              <div className="row align-items-center g-4">
                {/* Left Column: Feature explanation */}
                <div className="col-lg-7">
                  <div className="about-ats-badge">
                    <span role="img" aria-label="sparkles">✨</span>
                    <span>AI-Powered Career Intelligence</span>
                  </div>
                  <h2 className="about-ats-title">
                    AI-Powered{' '}
                    <span className="about-gradient-text">
                      ATS Resume Analyzer
                    </span>
                  </h2>
                  <p className="about-ats-desc">
                    Navigating campus placements requires standing out in modern Applicant Tracking Systems (ATS).
                    Our dedicated AI-powered tool will help students compare their resumes with target job
                    descriptions, identify matching and missing skills, and receive personalized resume improvement
                    suggestions before applying.
                  </p>

                  <div className="about-ats-points">
                    <div className="about-ats-point">
                      <div className="about-ats-point-icon">📄</div>
                      <div className="about-ats-point-title">Resume vs. JD Comparison</div>
                      <p className="about-ats-point-text">
                        Upload your PDF resume and pair it with any job posting to evaluate role alignment.
                      </p>
                    </div>

                    <div className="about-ats-point">
                      <div className="about-ats-point-icon">🔍</div>
                      <div className="about-ats-point-title">Skill Gap Analysis</div>
                      <p className="about-ats-point-text">
                        Quickly identify recognized technical skills and discover critical missing keywords.
                      </p>
                    </div>

                    <div className="about-ats-point">
                      <div className="about-ats-point-icon">💡</div>
                      <div className="about-ats-point-title">Targeted Suggestions</div>
                      <p className="about-ats-point-text">
                        Receive constructive feedback to refine formatting, phrasing, and industry relevance.
                      </p>
                    </div>

                    <div className="about-ats-point">
                      <div className="about-ats-point-icon">📊</div>
                      <div className="about-ats-point-title">ATS Match Score</div>
                      <p className="about-ats-point-text">
                        Obtain an objective compatibility percentage to gauge your shortlisting probability.
                      </p>
                    </div>
                  </div>

                  <div className="about-ats-note">
                    <strong>Implementation Status:</strong> The ATS Resume Analyzer is currently implemented as an active feature module in our system, supporting PDF upload parsing, job description keyword matching, and automated feedback. Students can test their resumes directly in the portal.
                  </div>

                  <div className="d-flex flex-wrap gap-3">
                    <Link to="/jobs/resume-analyzer" className="btn btn-primary px-4 py-2">
                      Try ATS Resume Analyzer <span aria-hidden="true">→</span>
                    </Link>
                    <Link to="/jobs" className="btn btn-outline-primary px-4 py-2">
                      Browse Matching Jobs
                    </Link>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="col-lg-5">
                  <div className="about-ats-mockup">
                    <div className="about-ats-mockup-header">
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted)', fontWeight: 600 }}>
                          ANALYZER PREVIEW
                        </div>
                        <div style={{ fontWeight: 700, color: 'var(--text-900)', fontSize: '0.96rem' }}>
                          Target: Full Stack Developer
                        </div>
                      </div>
                      <span className="badge bg-success-subtle text-success border border-success-subtle">
                        Live Module
                      </span>
                    </div>

                    <div className="about-ats-score-box">
                      <div className="about-ats-score-num">84%</div>
                      <div className="about-ats-score-sub">Strong ATS Compatibility</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-500)', marginTop: 4 }}>
                        Resume aligns well with core technical requirements
                      </div>
                    </div>

                    <div className="about-chip-group">
                      <div className="about-chip-label" style={{ color: '#059669' }}>
                        <span>✓</span>
                        <span>Matching Skills (Detected in Resume)</span>
                      </div>
                      <div className="about-chips">
                        <span className="about-chip about-chip-success">React.js</span>
                        <span className="about-chip about-chip-success">Node.js</span>
                        <span className="about-chip about-chip-success">JavaScript</span>
                        <span className="about-chip about-chip-success">REST APIs</span>
                        <span className="about-chip about-chip-success">Git & GitHub</span>
                        <span className="about-chip about-chip-success">SQL / MongoDB</span>
                      </div>
                    </div>

                    <div className="about-chip-group">
                      <div className="about-chip-label" style={{ color: '#d97706' }}>
                        <span>+</span>
                        <span>Missing Skills (Recommended to Add)</span>
                      </div>
                      <div className="about-chips">
                        <span className="about-chip about-chip-warning">Docker</span>
                        <span className="about-chip about-chip-warning">TypeScript</span>
                        <span className="about-chip about-chip-warning">CI/CD Pipeline</span>
                      </div>
                    </div>

                    <div className="about-ats-mockup-tip">
                      <span role="img" aria-label="bulb">💡</span>
                      <div>
                        <strong>Pro Tip:</strong> Incorporating real-world project examples with <em>Docker</em> or <em>TypeScript</em> can boost this match score up to <strong>94%</strong>.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 4. "Our Mission" Section ──────────────────────────────── */}
      <section className="about-section pt-0">
        <div className="container">
          <AnimatedSection>
            <div className="about-mission-card">
              <span className="about-mission-badge">Our Purpose & Vision</span>
              <h2 className="about-mission-title">Our Mission</h2>
              <p className="about-mission-lead">
                Our goal is to make campus placements <strong>easier</strong>,{' '}
                <strong>smarter</strong>, and <strong>more accessible</strong> for students, recruiters, and college administrators alike.
              </p>

              <div className="row g-4">
                <div className="col-md-4">
                  <div className="about-pillar-card">
                    <div className="about-pillar-icon">
                      <span role="img" aria-label="lightning">⚡</span>
                    </div>
                    <h3 className="about-pillar-name">Easier</h3>
                    <p className="about-pillar-desc">
                      Eliminating chaotic paperwork, endless spreadsheet coordination, and fragmented communication with an intuitive, unified digital workflow.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="about-pillar-card">
                    <div className="about-pillar-icon">
                      <span role="img" aria-label="brain">🧠</span>
                    </div>
                    <h3 className="about-pillar-name">Smarter</h3>
                    <p className="about-pillar-desc">
                      Harnessing intelligent matching algorithms, ATS resume diagnostics, and real-time placement analytics to connect the right candidate with the right opportunity.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="about-pillar-card">
                    <div className="about-pillar-icon">
                      <span role="img" aria-label="globe">🌐</span>
                    </div>
                    <h3 className="about-pillar-name">More Accessible</h3>
                    <p className="about-pillar-desc">
                      Providing transparent vacancy access, instant stage updates, and equal opportunity for every student across diverse departments and skill levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 5. Core Values & Principles ───────────────────────────── */}
      <section className="about-values-section pt-0">
        <div className="container">
          <AnimatedSection>
            <div className="row g-3">
              <div className="col-md-6 col-lg-3">
                <div className="about-value-box">
                  <div className="about-value-icon">🤝</div>
                  <div>
                    <div className="about-value-title">Transparency</div>
                    <p className="about-value-desc">Clear eligibility criteria & real-time application status</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="about-value-box">
                  <div className="about-value-icon">🔒</div>
                  <div>
                    <div className="about-value-title">Data Integrity</div>
                    <p className="about-value-desc">Verified academic records and secure student data</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="about-value-box">
                  <div className="about-value-icon">🚀</div>
                  <div>
                    <div className="about-value-title">Career Acceleration</div>
                    <p className="about-value-desc">Empowering students with feedback & industry opportunities</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="about-value-box">
                  <div className="about-value-icon">📈</div>
                  <div>
                    <div className="about-value-title">Continuous Innovation</div>
                    <p className="about-value-desc">Constantly evolving tools like AI ATS resume scoring</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── 6. Call to Action ───────────────────────────────────────── */}
      <section className="pb-5">
        <div className="container">
          <AnimatedSection>
            <div className="about-cta-card">
              <h2 className="about-cta-title">Join the Future of Campus Placements</h2>
              <p className="about-cta-sub">
                Whether you are a student preparing for your career, a recruiter discovering top talent,
                or an administrator coordinating campus drives — get started today.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/register" className="btn btn-light btn-lg px-4 font-weight-bold" style={{ fontWeight: 600, color: '#2563eb' }}>
                  Create an Account <span aria-hidden="true">→</span>
                </Link>
                <Link to="/jobs" className="btn btn-outline-light btn-lg px-4">
                  Browse Active Jobs
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
