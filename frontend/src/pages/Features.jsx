import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import '../styles/Public.css';

export default function Features() {
    return (
        <div className="public-page">
            <PublicNavbar />
            <div className="public-content">
                <header className="features-hero">
                    <h1 className="page-title">Platform Features</h1>
                    <p className="page-subtitle">Discover the tools that will transform your team's productivity and customer relationships.</p>
                </header>

                <div className="feature-row">
                    <div className="feature-content">
                        <h2>AI-Driven Analytics</h2>
                        <p>Stop guessing and start knowing. Our predictive AI analyzes your project data to forecast completion dates, identify bottlenecks, and suggest resource optimizations before issues arise.</p>
                        <ul className="feature-list-check">
                            <li><i className="fas fa-check-circle"></i> Predictive Sprint Velocity</li>
                            <li><i className="fas fa-check-circle"></i> Automated Risk Assessment</li>
                            <li><i className="fas fa-check-circle"></i> Resource Heatmaps</li>
                        </ul>
                    </div>
                    <div className="feature-image">
                        {/* Placeholder for AI Dashboard UI */}
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1', fontSize: '3rem' }}><i className="fas fa-brain"></i></div>
                    </div>
                </div>

                <div className="feature-row reverse">
                    <div className="feature-content">
                        <h2>Kanban & Agile Workflows</h2>
                        <p>Visualize your work with our powerful Kanban boards. Drag-and-drop tasks, set WIP limits, and customize columns to match your team's unique process.</p>
                        <ul className="feature-list-check">
                            <li><i className="fas fa-check-circle"></i> Customizable Swimlanes</li>
                            <li><i className="fas fa-check-circle"></i> Epic & Story Hierarchy</li>
                            <li><i className="fas fa-check-circle"></i> Real-time Team Collaboration</li>
                        </ul>
                    </div>
                    <div className="feature-image">
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ec4899', fontSize: '3rem' }}><i className="fas fa-columns"></i></div>
                    </div>
                </div>

                <div className="feature-row">
                    <div className="feature-content">
                        <h2>CRM & Lead Management</h2>
                        <p>Close more deals with our integrated CRM. Track every interaction, automate follow-ups, and score leads based on engagement using our machine learning models.</p>
                        <ul className="feature-list-check">
                            <li><i className="fas fa-check-circle"></i> 360° Customer View</li>
                            <li><i className="fas fa-check-circle"></i> Email Integration</li>
                            <li><i className="fas fa-check-circle"></i> Pipeline Visualization</li>
                        </ul>
                    </div>
                    <div className="feature-image">
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', fontSize: '3rem' }}><i className="fas fa-users"></i></div>
                    </div>
                </div>

                <section className="public-section">
                    <div className="page-header-section">
                        <h2>More Than Just Tools</h2>
                        <p className="page-subtitle">A complete ecosystem for your business</p>
                    </div>
                    <div className="public-grid">
                        {[
                            { icon: 'fa-shield-alt', title: 'Enterprise Security', desc: 'SSO, 2FA, and Audit Logs standard on all plans.' },
                            { icon: 'fa-globe', title: 'Global CDN', desc: 'Lightning fast access from anywhere in the world.' },
                            { icon: 'fa-code-branch', title: 'Advanced Git Ops', desc: 'Link commits and PRs directly to tasks.' },
                            { icon: 'fa-robot', title: 'Automation Rules', desc: 'Create "If This Then That" rules for any workflow.' },
                            { icon: 'fa-plug', title: 'API & Integrations', desc: 'Connect with Slack, Jira, GitHub, and 50+ tools.' },
                            { icon: 'fa-mobile-alt', title: 'Mobile App', desc: 'Manage your projects on the go with our native app.' }
                        ].map((f, i) => (
                            <div key={i} className="feature-card-lg">
                                <div className="f-icon"><i className={`fas ${f.icon}`}></i></div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <PublicFooter />
        </div>
    );
}
