import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import '../styles/Landing.css'; // Keep Landing specific styles
import '../styles/Public.css'; // Add Public shared styles

export default function Landing() {
    return (
        <div className="public-page">
            <PublicNavbar />

            {/* Hero Section */}
            <header className="landing-hero" style={{ paddingTop: '120px', minHeight: 'auto' }}>
                <div className="hero-content">
                    <span className="hero-badge">New: AI-Powered Lead Scoring v2.0 <i className="fas fa-arrow-right"></i></span>
                    <h1>The Intelligent CRM Platform for <span className="gradient-text">Modern Teams</span></h1>
                    <p className="hero-subtitle">Transform your customer relationships with predictive AI, automated workflows, and comprehensive project management in one unified platform.</p>
                    <div className="hero-cta">
                        <Link to="/register" className="btn btn-primary btn-lg">Start Free Trial <i className="fas fa-rocket"></i></Link>
                        <button className="btn btn-secondary btn-lg"><i className="fas fa-play"></i> Watch Demo</button>
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-num">10k+</span>
                            <span className="stat-label">Active Users</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">98%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-num">24/7</span>
                            <span className="stat-label">AI Support</span>
                        </div>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="visual-card main-card">
                        <div className="visual-header">
                            <div className="visual-dots"><span></span><span></span><span></span></div>
                            <div className="visual-bar"></div>
                        </div>
                        <div className="visual-body">
                            <div className="visual-row">
                                <div className="row-avatar"></div>
                                <div className="row-lines"><span></span><span></span></div>
                                <div className="row-tag"></div>
                            </div>
                            <div className="visual-row">
                                <div className="row-avatar"></div>
                                <div className="row-lines"><span></span><span></span></div>
                                <div className="row-tag"></div>
                            </div>
                            <div className="visual-graph">
                                <div className="graph-line"></div>
                                <div className="graph-point p1"></div>
                                <div className="graph-point p2"></div>
                                <div className="graph-point p3"></div>
                            </div>
                        </div>
                        <div className="visual-floating float-1">
                            <i className="fas fa-brain"></i>
                            <span>AI Insight</span>
                        </div>
                        <div className="visual-floating float-2">
                            <i className="fas fa-check-circle"></i>
                            <span>Task Complete</span>
                        </div>
                    </div>
                    <div className="hero-glow"></div>
                </div>
            </header>

            {/* Trust Banner using Public.css grid */}
            <section className="public-section" style={{ padding: '40px 0', borderBottom: 'none', background: 'var(--bg-primary)' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Trusted by innovative teams at</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.5 }}>
                    <i className="fab fa-google fa-2x"></i>
                    <i className="fab fa-amazon fa-2x"></i>
                    <i className="fab fa-microsoft fa-2x"></i>
                    <i className="fab fa-spotify fa-2x"></i>
                    <i className="fab fa-slack fa-2x"></i>
                </div>
            </section>

            {/* Features Preview */}
            <section id="features" className="public-section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-header">
                    <h2>Why Choose CRM.AI?</h2>
                    <p>Everything you need to manage projects and customers</p>
                </div>
                <div className="public-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                    <div className="landing-feature-card">
                        <div className="feature-icon icon-brain"><i className="fas fa-brain"></i></div>
                        <h3>Predictive AI Models</h3>
                        <p>Forecast sales trends and score leads automatically with our proprietary ML algorithms.</p>
                    </div>
                    <div className="landing-feature-card">
                        <div className="feature-icon icon-kanban"><i className="fas fa-columns"></i></div>
                        <h3>Kanban & Sprints</h3>
                        <p>Agile project management with customizable boards, swimlanes, and sprint planning.</p>
                    </div>
                    <div className="landing-feature-card">
                        <div className="feature-icon icon-analytics"><i className="fas fa-chart-pie"></i></div>
                        <h3>Advanced Analytics</h3>
                        <p>Real-time dashboards and custom reporting to track team performance and KPIs.</p>
                    </div>
                    <div className="landing-feature-card">
                        <div className="feature-icon icon-security"><i className="fas fa-shield-alt"></i></div>
                        <h3>Enterprise Security</h3>
                        <p>Role-based access control (RBAC), data encryption, and audit logs built-in.</p>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/features" className="btn btn-secondary">View All Features <i className="fas fa-arrow-right"></i></Link>
                </div>
            </section>

            <PublicFooter />
        </div>
    );
}
