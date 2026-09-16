import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const dummyStats = [
    {title:'Students', value:'500+', icon:'👩‍🎓'},
    {title:'Companies', value:'50+', icon:'🏢'},
    {title:'Jobs', value:'100+', icon:'💼'},
    {title:'Placement Rate', value:'85%', icon:'📈'}
  ]

  const features = [
    'Student Management',
    'Job Opportunities',
    'Application Management',
    'Recruiter Management',
    'Placement Tracking',
    'Notifications'
  ]

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="eyebrow">Campus Career Hub</p>
                <h1 className="hero-title">Web-Based Placement Management System</h1>
                <p className="hero-sub">Connecting Students with Career Opportunities</p>
                <div className="hero-actions">
                  <Link to="/jobs" className="btn btn-primary btn-lg">Explore Jobs</Link>
                  <Link to="/login" className="btn btn-outline-primary btn-lg">Student Login</Link>
                  <Link to="/recruiter/login" className="btn btn-secondary btn-lg">Recruiter Login</Link>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="hero-visual">
                  <img src="/hero-illustration.svg" alt="Career placement illustration" className="hero-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section py-5">
        <div className="container">
          <div className="row g-3">
            {dummyStats.map((s)=> (
              <div key={s.title} className="col-md-6 col-lg-3">
                <div className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-label">{s.title}</div>
                  <div className="stat-value">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="info-card h-100">
                <div className="section-heading">
                  <span className="section-kicker">About us</span>
                  <h3>About Placement Cell</h3>
                </div>
                <p>
                  Our placement cell connects students with leading companies and provides career guidance,
                  internship support, and structured recruitment opportunities to help them confidently step into the professional world.
                </p>
                <div className="about-image-wrap mt-4">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80" alt="Students collaborating" className="about-image" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="info-card h-100">
                <div className="section-heading">
                  <span className="section-kicker">Process</span>
                  <h3>How It Works</h3>
                </div>
                <div className="steps-list">
                  <div className="step-item"><span>1</span><div>Register</div></div>
                  <div className="step-item"><span>2</span><div>Complete Profile</div></div>
                  <div className="step-item"><span>3</span><div>Apply for Jobs</div></div>
                  <div className="step-item"><span>4</span><div>Get Placed</div></div>
                </div>
                <div className="mini-visual mt-4">
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80" alt="Recruitment process" className="mini-image" />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="info-card">
                <div className="section-heading">
                  <span className="section-kicker">Features</span>
                  <h3>Portal Highlights</h3>
                </div>
                <div className="row g-3 features-grid">
                  {features.map((feature)=> (
                    <div key={feature} className="col-md-6 col-lg-4">
                      <div className="feature-card">
                        <div className="feature-icon">✓</div>
                        <div>{feature}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
