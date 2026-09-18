import { useState } from 'react'
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CalendarCheck,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Database,
  Globe2,
  Menu,
  MessageSquareText,
  Network,
  Send,
  Settings2,
  Sparkles,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import './index.css'

const services = [
  {
    icon: MessageSquareText,
    title: 'AI Chatbots',
    text: '24/7 intelligent assistants that answer questions, guide customers, and capture inquiries.',
    tags: ['Website chatbot', 'FAQ automation', 'Lead capture'],
  },
  {
    icon: Zap,
    title: 'Lead Automation',
    text: 'Capture, qualify, organize, and respond to new opportunities before they go cold.',
    tags: ['AI qualification', 'CRM integration', 'Hot / warm / cold'],
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Automation',
    text: 'Turn scheduling requests into confirmed bookings with reminders and rescheduling built in.',
    tags: ['Calendar sync', 'Confirmations', 'Reminders'],
  },
  {
    icon: Clock3,
    title: 'AI Follow-Up',
    text: 'Keep every conversation moving with thoughtful, personalized follow-up at the right time.',
    tags: ['Lead nurturing', 'Scheduled messages', 'Tracking'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Agents',
    text: 'Deploy agents that understand tasks, use tools, make decisions, and execute multi-step workflows.',
    tags: ['Decision-making', 'Tool integrations', 'Human handoff'],
  },
  {
    icon: Settings2,
    title: 'Custom Automation',
    text: 'If a process repeats, we can create a custom system around the way your business works.',
    tags: ['API integrations', 'Google Workspace', 'Custom logic'],
  },
]

const industries = [
  ['Dental & Healthcare', 'Answer patient questions + appointment inquiries + follow-ups.', '✦'],
  ['Real Estate', 'Capture property leads + qualify buyers + automatic follow-up.', '⌂'],
  ['Hotels', 'Answer guest questions + booking inquiries + customer support.', '▦'],
  ['Restaurants', 'Handle reservations, menu questions, and event inquiries.', '◌'],
  ['Salons', 'Fill the calendar with booking flows and appointment reminders.', '✳'],
  ['Education', 'Answer prospective student questions and route applications.', '◇'],
  ['E-commerce', 'Support shoppers, recover carts, and triage order questions.', '◈'],
  ['Professional Services', 'Qualify inquiries and connect the right expert faster.', '↗'],
]

const steps = [
  ['01', 'Discover', 'Understand the business, current workflow, and repetitive tasks.'],
  ['02', 'Design', 'Create an automation strategy specifically for the business.'],
  ['03', 'Build', 'Connect AI, APIs, CRM, email, calendars, and the tools you already use.'],
  ['04', 'Launch', 'Test, optimize, and deploy a system your team can rely on.'],
]

function Logo({ compact = false }) {
  return (
    <a className="logo" href="#top" aria-label="Autonexa AI home">
      <span className="logo-mark">
        <span>A</span>
        <span>N</span>
      </span>
      {!compact && (
        <span>
          AUTONEXA <b>AI</b>
        </span>
      )}
    </a>
  )
}

function Button({
  children,
  variant = 'primary',
  href = '#contact',
  icon = true,
}) {
  return (
    <a className={`button ${variant}`} href={href}>
      {children}
      {icon && <ArrowUpRight size={16} />}
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [formSent, setFormSent] = useState(false)
  const [formLoading, setFormLoading] = useState(false)

  // =========================================================
  // CONTACT FORM → VERCEL API → MAKE WEBHOOK
  // =========================================================
  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget

    setFormLoading(true)
    setFormSent(false)

    const formData = new FormData(form)

    const payload = {
      name: formData.get('name') || '',
      business: formData.get('business') || '',
      email: formData.get('email') || '',
      whatsapp: formData.get('whatsapp') || '',
      industry: formData.get('industry') || '',
      message: formData.get('message') || '',
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Lead submission failed')
      }

      setFormSent(true)
      form.reset()

    } catch (error) {
      console.error('Form submission error:', error)

      alert(
        'Something went wrong while sending your request. Please try again.'
      )
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="site-shell" id="top">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="site-header">
        <div className="container nav-wrap">
          <Logo />

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
            {[
              'Solutions',
              'Services',
              'How It Works',
              'Industries',
              'About',
            ].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <Button href="#contact">Book a Free Demo</Button>
          </nav>
        </div>
      </header>

      <main>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="hero container">
          <div className="hero-copy reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              AI AUTOMATION
              <i />
              INTELLIGENT WORKFLOWS
              <i />
              AI AGENTS
            </div>

            <h1>
              Automate your business.
              <br />
              <em>Unlock your next level.</em>
            </h1>

            <p className="hero-text">
              Autonexa AI builds intelligent automation systems that handle
              repetitive work, respond to customers, capture leads, and connect
              your business processes, automatically.
            </p>

            <div className="hero-actions">
              <Button>Book a Free Demo</Button>

              <Button
                variant="ghost"
                href="#solutions"
              >
                Explore Solutions
                <ChevronRight size={16} />
              </Button>
            </div>

            <div className="trust-row">
              <span>
                <CircleCheck size={15} />
                Built for modern businesses
              </span>

              <span>
                <CircleCheck size={15} />
                Available 24/7
              </span>

              <span>
                <CircleCheck size={15} />
                Custom workflows
              </span>
            </div>
          </div>

          <div className="hero-visual reveal delay-one">
            <div className="visual-topline">
              <span>
                <span className="status-dot" />
                Workflow active
              </span>

              <span className="visual-id">FLOW / 0048</span>
            </div>

            <div className="flow-board">
              <div className="flow-heading">
                <div>
                  <span className="mini-kicker">AUTOMATION SYSTEM</span>
                  <strong>Inbound lead engine</strong>
                </div>

                <span className="live-pill">LIVE</span>
              </div>

              <div className="flow-line" />

              {[
                [
                  MessageSquareText,
                  'Customer message',
                  'Received 2s ago',
                ],
                [
                  BrainCircuit,
                  'AI understanding',
                  'Intent: book a demo',
                ],
                [
                  Database,
                  'CRM + lead score',
                  'Lead score: 92 / 100',
                ],
                [
                  Send,
                  'Personalized response',
                  'Sent automatically',
                ],
              ].map(([Icon, title, sub], index) => (
                <div className="flow-node" key={title}>
                  <div className="node-icon">
                    <Icon size={17} />
                  </div>

                  <div>
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </div>

                  <span className="node-check">
                    <Check size={13} />
                  </span>

                  {index < 3 && <span className="node-connector" />}
                </div>
              ))}

              <div className="board-footer">
                <span>
                  <Network size={14} />
                  6 connected tools
                </span>

                <span>
                  Last run <b>just now</b>
                </span>
              </div>
            </div>

            <div className="float-card">
              <span className="float-icon">
                <Sparkles size={15} />
              </span>

              <div>
                <b>Automation ready</b>
                <small>4 tasks completed today</small>
              </div>

              <span className="up-value">+48%</span>
            </div>
          </div>
        </section>

        {/* =====================================================
            LOGO STRIP
        ====================================================== */}
        <section className="logo-strip">
          <div className="container logo-strip-inner">
            <span>BUILT FOR TEAMS THAT MOVE FAST</span>
            <span>Make</span>
            <span>Google Workspace</span>
            <span>HubSpot</span>
            <span>Calendly</span>
            <span>OpenAI</span>
          </div>
        </section>

        {/* =====================================================
            SOLUTIONS
        ====================================================== */}
        <section
          className="section container problem-section"
          id="solutions"
        >
          <div className="section-heading split-heading">
            <div>
              <span className="section-label">THE MANUAL WORK TAX</span>

              <h2>
                Your team shouldn't
                <br />
                <em>have to do everything.</em>
              </h2>
            </div>

            <p>
              Every manual handoff costs time, attention, and momentum. We turn
              those hidden bottlenecks into intelligent systems that work in the
              background.
            </p>
          </div>

          <div className="problem-grid">
            {[
              [
                '01',
                'Missed leads',
                'Potential customers may reach you when your team is unavailable.',
                '↗',
              ],
              [
                '02',
                'Slow responses',
                'Customers expect fast, useful answers at every hour.',
                '◷',
              ],
              [
                '03',
                'Repetitive tasks',
                'Your team wastes time answering the same questions again and again.',
                '↻',
              ],
              [
                '04',
                'Forgotten follow-ups',
                'Great opportunities disappear without consistent follow-through.',
                '⌁',
              ],
            ].map(([num, title, text, glyph]) => (
              <article className="problem-card" key={title}>
                <div className="card-top">
                  <span>{num}</span>
                  <b>{glyph}</b>
                </div>

                <h3>{title}</h3>

                <p>{text}</p>

                <a href="#contact">
                  Fix this workflow
                  <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>

          <div className="statement">
            <span className="statement-mark">
              <Workflow size={21} />
            </span>

            <strong>
              Autonexa AI turns repetitive business processes into intelligent
              automated workflows.
            </strong>

            <ArrowUpRight size={20} />
          </div>
        </section>

        {/* =====================================================
            SERVICES
        ====================================================== */}
        <section
          className="section services-section"
          id="services"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHAT WE BUILD</span>

              <h2>
                AI solutions that
                <br />
                <em>work while you work.</em>
              </h2>

              <p>
                Practical automation systems designed around your business,
                your customers, and the tools you already use.
              </p>
            </div>

            <div className="service-grid">
              {services.map(
                ({ icon: Icon, title, text, tags }, index) => (
                  <article
                    className="service-card"
                    key={title}
                  >
                    <div className="service-number">
                      0{index + 1}
                    </div>

                    <div className="service-icon">
                      <Icon size={22} />
                    </div>

                    <h3>{title}</h3>

                    <p>{text}</p>

                    <div className="tag-list">
                      {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="card-link"
                    >
                      Explore service
                      <ArrowUpRight size={15} />
                    </a>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            PROCESS
        ====================================================== */}
        <section
          className="section process-section"
          id="how-it-works"
        >
          <div className="container">
            <div className="section-heading centered">
              <span className="section-label">
                A CLEARER WAY FORWARD
              </span>

              <h2>
                From manual process
                <br />
                <em>to intelligent system.</em>
              </h2>

              <p>
                We meet your business where it is, then build the shortest path
                to a smarter operation.
              </p>
            </div>

            <div className="steps">
              {steps.map(([num, title, text], index) => (
                <div className="step" key={num}>
                  <div className="step-number">{num}</div>

                  <div className="step-copy">
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>

                  {index < 3 && (
                    <div className="step-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            DEMO
        ====================================================== */}
        <section
          className="section demo-section"
          id="demo"
        >
          <div className="container">
            <div className="section-heading split-heading demo-heading">
              <div>
                <span className="section-label">
                  INTERACTIVE PREVIEW
                </span>

                <h2>
                  See automation
                  <br />
                  <em>in action.</em>
                </h2>
              </div>

              <p>
                One conversation can trigger an entire system. Here is what a
                smarter customer journey feels like.
              </p>
            </div>

            <div className="demo-window">
              <div className="demo-sidebar">
                <div className="demo-brand">
                  <span className="tiny-mark">A</span>
                  AUTONEXA <b>AI</b>
                </div>

                <span className="demo-sidebar-label">
                  WORKFLOW STEPS
                </span>

                {[
                  'Customer message',
                  'AI understanding',
                  'Lead qualification',
                  'CRM / database',
                  'Follow-up',
                ].map((step, index) => (
                  <button
                    className={
                      demoStep === index
                        ? 'demo-side-step active'
                        : 'demo-side-step'
                    }
                    key={step}
                    onClick={() => setDemoStep(index)}
                  >
                    <span>{index + 1}</span>
                    {step}
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>

              <div className="chat-panel">
                <div className="chat-head">
                  <div>
                    <span className="status-dot" />
                    AI concierge
                    <small>Online now</small>
                  </div>

                  <span>•••</span>
                </div>

                <div className="chat-content">
                  <div className="chat-date">
                    TODAY · 10:42 AM
                  </div>

                  <div className="message user-message">
                    Hi, I want to know about your services and book an
                    appointment.
                  </div>

                  <div className="message ai-message">
                    <span className="ai-avatar">
                      <Bot size={14} />
                    </span>

                    <div>
                      Absolutely! I can help with that. We offer several
                      services. What type of service are you interested in, and
                      what date would you prefer?

                      <div className="typing">
                        <i />
                        <i />
                        <i />
                      </div>
                    </div>
                  </div>

                  <div className="chat-suggestion">
                    <span>Suggested actions</span>

                    <button
                      type="button"
                      onClick={() => setDemoStep(2)}
                    >
                      Qualify lead
                      <ArrowUpRight size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDemoStep(4)}
                    >
                      Book appointment
                      <CalendarCheck size={13} />
                    </button>
                  </div>

                  <div className="chat-input">
                    Type a message...
                    <Send size={16} />
                  </div>
                </div>
              </div>

              <div className="demo-status">
                <span className="status-dot" />
                <b>Workflow running</b>
                <span className="demo-status-line" />
                <span>Step {demoStep + 1} of 5</span>
              </div>
            </div>

            <div className="demo-cta">
              <p>Ready to see this with your workflow?</p>
              <Button href="#contact">
                Build My Automation
              </Button>
            </div>
          </div>
        </section>

        {/* =====================================================
            INDUSTRIES
        ====================================================== */}
        <section
          className="section industries-section"
          id="industries"
        >
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <span className="section-label">
                  BUILT FOR YOUR WORLD
                </span>

                <h2>
                  Automation for
                  <br />
                  <em>every modern business.</em>
                </h2>
              </div>

              <p>
                The best automation feels like it was always part of the way
                you work. We make it fit your industry, your customers, and
                your pace.
              </p>
            </div>

            <div className="industry-grid">
              {industries.map(([title, text, glyph]) => (
                <article
                  className="industry-card"
                  key={title}
                >
                  <span className="industry-glyph">
                    {glyph}
                  </span>

                  <h3>{title}</h3>

                  <p>{text}</p>

                  <ArrowUpRight
                    className="industry-arrow"
                    size={18}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY AUTONEXA
        ====================================================== */}
        <section className="section why-section">
          <div className="container why-layout">
            <div className="section-heading">
              <span className="section-label">
                THE AUTONEXA DIFFERENCE
              </span>

              <h2>
                Useful intelligence.
                <br />
                <em>Zero unnecessary noise.</em>
              </h2>

              <p>
                We focus on outcomes your team can feel: fewer tabs, faster
                responses, and more room for meaningful work.
              </p>

              <Button href="#contact">
                Talk to an automation expert
              </Button>
            </div>

            <div className="why-grid">
              {[
                [
                  '24/7 automation',
                  'Your workflows keep running even when your team is offline.',
                  Clock3,
                ],
                [
                  'Faster responses',
                  'Give customers immediate answers that feel personal.',
                  Zap,
                ],
                [
                  'Less manual work',
                  'Automate the repetitive tasks your team has outgrown.',
                  Settings2,
                ],
                [
                  'Custom workflows',
                  'Build systems around your actual business, not a template.',
                  Workflow,
                ],
                [
                  'Connected systems',
                  'Connect your existing tools instead of replacing everything.',
                  Network,
                ],
                [
                  'Scalable AI',
                  'Start small and expand as your business grows.',
                  Sparkles,
                ],
              ].map(([title, text, Icon]) => (
                <article key={title}>
                  <span>
                    <Icon size={18} />
                  </span>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            ABOUT
        ====================================================== */}
        <section
          className="section about-section"
          id="about"
        >
          <div className="container about-layout">
            <div className="portrait-card">
              <div className="portrait-grid" />

              <div className="portrait-initials">
                ZA
              </div>

              <div className="portrait-caption">
                <span>FOUNDER / BUILDER</span>
                <b>People-first automation.</b>
              </div>
            </div>

            <div className="about-copy">
              <span className="section-label">
                MEET AUTONEXA AI
              </span>

              <h2>
                Technology that
                <br />
                <em>gives time back.</em>
              </h2>

              <p>
                Autonexa AI is an AI automation agency focused on helping
                modern businesses work smarter through artificial intelligence
                and intelligent workflow automation.
              </p>

              <div className="founder">
                <div>
                  <h3>Zamin Abbas</h3>
                  <span>
                    Founder & AI Automation Developer
                  </span>
                </div>

                <a href="#contact">
                  <Globe2 size={17} />
                </a>
              </div>

              <p className="bio">
                "I build practical AI automation systems that help businesses
                reduce repetitive work, respond faster, capture opportunities,
                and create better customer experiences."
              </p>

              <div className="skill-list">
                {[
                  'AI Automation',
                  'AI Agents',
                  'Make.com',
                  'AI Chatbots',
                  'Workflow Automation',
                  'API Integrations',
                  'Python',
                  'Business Process Automation',
                ].map((skill) => (
                  <span key={skill}>
                    <Check size={13} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RESULTS
        ====================================================== */}
        <section className="results-band">
          <div className="container result-grid">
            {[
              ['24/7', 'Automation availability'],
              ['Instant', 'Customer responses'],
              ['Automated', 'Lead follow-ups'],
              ['Custom', 'Business workflows'],
            ].map(([value, label]) => (
              <div className="result" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            CTA
        ====================================================== */}
        <section className="section cta-section">
          <div className="container cta-inner">
            <div>
              <span className="section-label">
                YOUR NEXT SYSTEM STARTS HERE
              </span>

              <h2>
                Have a process you
                <br />
                <em>want to automate?</em>
              </h2>

              <p>
                Tell us what takes up your team's time. We'll show you how AI
                automation can handle it.
              </p>
            </div>

            <div className="cta-actions">
              <Button>Book a Free Demo</Button>

              <Button
                variant="ghost"
                href="#contact"
              >
                Talk to Autonexa AI
                <MessageSquareText size={16} />
              </Button>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}
        <section
          className="section contact-section"
          id="contact"
        >
          <div className="container contact-layout">

            <div className="contact-copy">
              <span className="section-label">
                LET'S BUILD YOUR AUTOMATION
              </span>

              <h2>
                Make your next
                <br />
                <em>move a smart one.</em>
              </h2>

              <p>
                Share a little about your business and the work you'd like to
                automate. We'll come back with a practical next step.
              </p>

              <div className="contact-options">
                <a href="mailto:hello@autonexa.ai">
                  <span>
                    <Send size={16} />
                  </span>

                  <div>
                    <small>Email</small>
                    <b>hello@autonexa.ai</b>
                  </div>
                </a>

                <a href="#contact">
                  <span>
                    <MessageSquareText size={16} />
                  </span>

                  <div>
                    <small>WhatsApp</small>
                    <b>Message us on WhatsApp</b>
                  </div>
                </a>

                <a href="#contact">
                  <span>
                    <Globe2 size={16} />
                  </span>

                  <div>
                    <small>LinkedIn</small>
                    <b>Connect with Autonexa AI</b>
                  </div>
                </a>
              </div>
            </div>

            {/* =================================================
                WORKING FORM
            ================================================== */}
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">
                <label>
                  Full name

                  <input
                    name="name"
                    required
                    placeholder="Jane Smith"
                  />
                </label>

                <label>
                  Business name

                  <input
                    name="business"
                    required
                    placeholder="Your company"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Email address

                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="jane@company.com"
                  />
                </label>

                <label>
                  WhatsApp <span>(optional)</span>

                  <input
                    name="whatsapp"
                    placeholder="+1 555 000 0000"
                  />
                </label>
              </div>

              <label>
                Business type

                <select
                  name="industry"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select an industry
                  </option>

                  <option value="Healthcare">
                    Healthcare
                  </option>

                  <option value="Real estate">
                    Real estate
                  </option>

                  <option value="Professional services">
                    Professional services
                  </option>

                  <option value="E-commerce">
                    E-commerce
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label>
                What would you like to automate?

                <textarea
                  name="message"
                  required
                  placeholder="Tell us about the repetitive work you want to remove..."
                  rows="4"
                />
              </label>

              <button
                className="button form-button"
                type="submit"
                disabled={formLoading}
              >
                {formLoading
                  ? 'Sending...'
                  : formSent
                    ? 'Request received'
                    : 'Request Free Demo'}

                {formLoading ? (
                  <Clock3 size={16} />
                ) : formSent ? (
                  <Check size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </button>

              {formSent && (
                <p className="form-success">
                  <Check size={14} />
                  Thanks. We will be in touch shortly.
                </p>
              )}

            </form>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="site-footer">
        <div className="container footer-main">

          <div className="footer-brand">
            <Logo />
            <p>Automate. Connect. Grow.</p>
          </div>

          <div className="footer-links">
            <div>
              <span>Explore</span>
              <a href="#solutions">Solutions</a>
              <a href="#services">Services</a>
              <a href="#industries">Industries</a>
            </div>

            <div>
              <span>Company</span>
              <a href="#how-it-works">How It Works</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-social">
            <span>Follow the build</span>

            <div>
              <a
                href="#contact"
                aria-label="LinkedIn"
              >
                <Globe2 size={16} />
              </a>

              <a
                href="#contact"
                aria-label="Instagram"
              >
                <Globe2 size={16} />
              </a>

              <a
                href="#contact"
                aria-label="Facebook"
              >
                <Globe2 size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © 2026 Autonexa AI. All rights reserved.
          </span>

          <span>
            Built for a more intelligent way of working.
          </span>

          <a href="#top">
            Back to top
            <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
