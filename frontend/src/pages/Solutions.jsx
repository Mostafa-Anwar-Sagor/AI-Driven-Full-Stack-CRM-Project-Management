import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import '../styles/Public.css';

const solutionsData = {
    startups: {
        title: "Scale Fast with Automation",
        desc: "Startups need to move fast. CRM.AI automates your busywork so you can focus on product. Pre-built templates for fundraising, product roadmaps, and hiring pipelines get you started in minutes.",
        features: [
            { icon: "fa-rocket", title: "Quick Launch Templates", desc: "Get up and running in minutes, not months." },
            { icon: "fa-chart-line", title: "Growth Tracking", desc: "Monitor burn rate and MRR alongside dev tasks." },
            { icon: "fa-users", title: "Team Onboarding", desc: "Simple workflows for growing teams." }
        ]
    },
    enterprise: {
        title: "Security & Control at Scale",
        desc: "Enterprise-grade security, compliance, and administration controls. Manage thousands of users and complex projects with ease.",
        features: [
            { icon: "fa-shield-alt", title: "SSO & Audit Logs", desc: "Full visibility into every action taken." },
            { icon: "fa-server", title: "Dedicated Infrastructure", desc: "Your own private cloud or on-prem deployment." },
            { icon: "fa-headset", title: "24/7 Priority Support", desc: "Response times under 15 minutes, guaranteed." }
        ]
    },
    agencies: {
        title: "Manage Multiple Clients Seamlessly",
        desc: "Keep client projects separate but manageable from a single dashboard. Share restricted views with clients to keep them in the loop without exposing internal comms.",
        features: [
            { icon: "fa-briefcase", title: "Client Portals", desc: "Give clients a branded view of their project status." },
            { icon: "fa-file-invoice-dollar", title: "Time & Billing", desc: "Track billable hours directly on cards." },
            { icon: "fa-tasks", title: "Resource Planning", desc: "Balance workload across multiple client accounts." }
        ]
    },
    agile: {
        title: "Pure Agile Workflow",
        desc: "Built for Scrum and Kanban masters. Burndown charts, sprint planning, backlog refinement, and velocity tracking built right in.",
        features: [
            { icon: "fa-sync", title: "Sprint Automation", desc: "Auto-move unfinished tasks to next sprint." },
            { icon: "fa-chart-area", title: "Velocity Charts", desc: "Predict future performance based on history." },
            { icon: "fa-code-branch", title: "Git Integration", desc: "Link PRs and commits to User Stories." }
        ]
    }
};

export default function Solutions() {
    const [activeTab, setActiveTab] = useState('startups');

    const currentData = solutionsData[activeTab];

    return (
        <div className="public-page">
            <PublicNavbar />
            <div className="public-content">
                <header className="solution-hero">
                    <div style={{ zIndex: 2, padding: '0 20px' }}>
                        <h1 className="page-title">Solutions for Every Team</h1>
                        <p className="page-subtitle" style={{ color: '#e2e8f0' }}>Whether you're a startup or a global enterprise, we have a tailored workspace for you.</p>
                    </div>
                    {/* Updated overlay for better visibility */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,14,26,0.6), rgba(10,14,26,0.9))', zIndex: 1 }}></div>
                </header>

                <div className="solution-filters">
                    <button
                        className={`filter-btn ${activeTab === 'startups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('startups')}
                    >
                        For Startups
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'enterprise' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enterprise')}
                    >
                        For Enterprise
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'agencies' ? 'active' : ''}`}
                        onClick={() => setActiveTab('agencies')}
                    >
                        For Agencies
                    </button>
                    <button
                        className={`filter-btn ${activeTab === 'agile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('agile')}
                    >
                        For Agile Teams
                    </button>
                </div>

                <div className="public-grid">
                    <div className="feature-card-lg" style={{ gridColumn: 'span 2' }}>
                        <div className="f-icon" style={{ background: 'rgba(99,102,241,0.2)' }}><i className={`fas ${currentData.features[0].icon}`}></i></div>
                        <h3>{currentData.title}</h3>
                        <p>{currentData.desc}</p>
                        <Link to="/register" className="f-link">Get Started with {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} <i className="fas fa-arrow-right"></i></Link>
                    </div>
                    <div className="feature-card-lg">
                        <div className="f-icon"><i className={`fas ${currentData.features[1].icon}`}></i></div>
                        <h3>{currentData.features[1].title}</h3>
                        <p>{currentData.features[1].desc}</p>
                    </div>
                </div>

                <section className="public-section">
                    <div className="page-header-section">
                        <h2>Industries We Serve</h2>
                    </div>
                    <div className="public-grid">
                        {[
                            { title: 'Software Development', icon: 'fa-laptop-code', desc: 'Manage sprints, backlog, and releases.' },
                            { title: 'Marketing', icon: 'fa-bullhorn', desc: 'Campaign tracking and creative asset management.' },
                            { title: 'Sales', icon: 'fa-handshake', desc: 'Lead pipelines and contact management.' },
                            { title: 'HR & Recruiting', icon: 'fa-user-tie', desc: 'Applicant tracking and onboarding workflows.' },
                            { title: 'Design', icon: 'fa-palette', desc: 'Design feedback loops and file proofing.' },
                            { title: 'Consulting', icon: 'fa-briefcase', desc: 'Client portals and billable hours tracking.' }
                        ].map((s, i) => (
                            <div key={i} className="feature-card-lg" style={{ padding: '24px' }}>
                                <div className="f-icon" style={{ width: '48px', height: '48px', fontSize: '1.2rem', marginBottom: '16px' }}><i className={`fas ${s.icon}`}></i></div>
                                <h3 style={{ fontSize: '1.1rem' }}>{s.title}</h3>
                                <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <PublicFooter />
        </div>
    );
}
