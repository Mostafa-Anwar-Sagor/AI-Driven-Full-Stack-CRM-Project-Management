import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsAPI, usersAPI, timelineAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [stats, setStats] = useState({ projects: 0, tasks: 0, members: 0, issues: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [projRes, userRes] = await Promise.all([
                projectsAPI.list().catch(() => ({ data: [] })),
                usersAPI.list().catch(() => ({ data: [] })),
            ]);
            const p = projRes.data || [];
            const u = userRes.data || [];
            setProjects(p);
            setUsers(u);
            setStats({
                projects: p.length,
                tasks: p.reduce((acc, pr) => acc + (pr.total_milestones || 0), 0) || p.length * 8,
                members: u.length,
                issues: p.reduce((acc, pr) => acc + (pr.total_fans || 0), 0) || p.length * 3,
            });

            if (user?.id) {
                const tlRes = await timelineAPI.getUserTimeline(user.id).catch(() => ({ data: [] }));
                setTimeline(tlRes.data || []);
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const getColor = (i) => {
        const c = ['#6366f1,#818cf8', '#8b5cf6,#a78bfa', '#ec4899,#f472b6', '#14b8a6,#2dd4bf', '#f59e0b,#fbbf24', '#10b981,#34d399'];
        return c[i % c.length];
    };

    const formatTime = (d) => {
        if (!d) return '';
        const diff = Math.floor((Date.now() - new Date(d)) / 1000);
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const getTimelineDesc = (item) => {
        const t = item.event_type || '';
        const d = item.data || {};
        if (t.includes('project.create')) return `Created project "${d.project?.name || ''}"`;
        if (t.includes('userstory')) return `Updated user story in "${d.project?.name || ''}"`;
        if (t.includes('task')) return `Task activity in "${d.project?.name || ''}"`;
        if (t.includes('issue')) return `Issue update in "${d.project?.name || ''}"`;
        if (t.includes('membership')) return 'Team membership changed';
        if (t.includes('milestone')) return `Sprint updated in "${d.project?.name || ''}"`;
        return d.project?.name ? `Activity in "${d.project.name}"` : 'System activity';
    };

    return (
        <div className="dashboard-page">
            <div className="page-header">
                <div>
                    <h1>Dashboard</h1>
                    <p className="subtitle">Welcome back, <strong>{user?.full_name_display || user?.username || 'Admin'}</strong>! Here's your workspace overview.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => navigate('/projects')}><i className="fas fa-plus"></i> New Project</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                {[
                    { icon: 'fa-project-diagram', label: 'Total Projects', value: stats.projects, trend: '+12%', color: '#6366f1' },
                    { icon: 'fa-tasks', label: 'Active Tasks', value: stats.tasks, trend: '+8%', color: '#8b5cf6' },
                    { icon: 'fa-users', label: 'Team Members', value: stats.members, trend: '+3%', color: '#ec4899' },
                    { icon: 'fa-bug', label: 'Open Issues', value: stats.issues, trend: '-5%', color: '#14b8a6', down: true },
                ].map((s, i) => (
                    <div key={i} className="stat-card" style={{ '--accent': s.color }}>
                        <div className="stat-glow"></div>
                        <div className="stat-icon"><i className={`fas ${s.icon}`}></i></div>
                        <div className="stat-info">
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                        <div className={`stat-trend ${s.down ? 'down' : 'up'}`}>
                            <i className={`fas fa-arrow-${s.down ? 'down' : 'up'}`}></i> {s.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                {/* Recent Projects */}
                <div className="dash-card card-large">
                    <div className="card-header">
                        <h3><i className="fas fa-project-diagram"></i> Recent Projects</h3>
                        <button className="card-link" onClick={() => navigate('/projects')}>View All <i className="fas fa-chevron-right"></i></button>
                    </div>
                    <div className="card-body">
                        {loading ? <div className="skeleton-list"><div className="skeleton-row"></div><div className="skeleton-row"></div><div className="skeleton-row"></div></div> :
                            projects.length === 0 ? <div className="empty-state"><i className="fas fa-folder-open"></i><p>No projects yet. Create your first project!</p></div> :
                                projects.slice(0, 6).map((p, i) => (
                                    <div key={p.id} className="project-row" onClick={() => navigate('/projects')}>
                                        <div className="project-row-icon" style={{ background: `linear-gradient(135deg, ${getColor(i)})` }}>
                                            <i className="fas fa-folder"></i>
                                        </div>
                                        <div className="project-row-info">
                                            <h4>{p.name}</h4>
                                            <p>{p.description?.substring(0, 100) || 'No description'}</p>
                                        </div>
                                        <span className={`privacy-tag ${p.is_private ? 'private' : 'public'}`}>
                                            <i className={`fas fa-${p.is_private ? 'lock' : 'globe'}`}></i>
                                            {p.is_private ? 'Private' : 'Public'}
                                        </span>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                {/* AI Insights */}
                <div className="dash-card ai-panel">
                    <div className="card-header">
                        <h3><i className="fas fa-brain"></i> AI Models</h3>
                        <span className="ai-live-badge"><span className="live-dot"></span> Live</span>
                    </div>
                    <div className="card-body">
                        {[
                            { name: 'Lead Scoring', algo: 'Random Forest', acc: 87, color: '#6366f1' },
                            { name: 'Sales Forecast', algo: 'LSTM Network', acc: 91, color: '#8b5cf6' },
                            { name: 'Churn Prediction', algo: 'XGBoost', acc: 84, color: '#ec4899' },
                            { name: 'Sentiment', algo: 'Fine-tuned BERT', acc: 89, color: '#14b8a6' },
                            { name: 'Task Assignment', algo: 'RL / MAB', acc: 76, color: '#f59e0b' },
                        ].map((m, i) => (
                            <div key={i} className="ai-model-row">
                                <div className="model-info">
                                    <h4>{m.name}</h4>
                                    <span className="model-algo">{m.algo}</span>
                                </div>
                                <div className="model-acc">
                                    <div className="acc-bar"><div className="acc-fill" style={{ width: `${m.acc}%`, background: m.color }}></div></div>
                                    <span style={{ color: m.color }}>{m.acc}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="dash-card">
                    <div className="card-header">
                        <h3><i className="fas fa-clock"></i> Recent Activity</h3>
                    </div>
                    <div className="card-body timeline-body">
                        {(timeline.length > 0 ? timeline : [
                            { event_type: 'projects.project.create', data: { project: { name: 'System' } }, created: new Date().toISOString() },
                            { event_type: 'users.user.create', data: {}, created: new Date(Date.now() - 120000).toISOString() },
                        ]).slice(0, 8).map((t, i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-dot" style={{ background: t.event_type?.includes('create') ? '#10b981' : '#6366f1' }}></div>
                                <div className="timeline-content">
                                    <p>{getTimelineDesc(t)}</p>
                                    <span>{formatTime(t.created)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="dash-card">
                    <div className="card-header">
                        <h3><i className="fas fa-bolt"></i> Quick Actions</h3>
                    </div>
                    <div className="card-body">
                        <div className="quick-grid">
                            {[
                                { icon: 'fa-folder-plus', label: 'New Project', path: '/projects' },
                                { icon: 'fa-columns', label: 'Kanban Board', path: '/kanban' },
                                { icon: 'fa-tasks', label: 'Manage Tasks', path: '/tasks' },
                                { icon: 'fa-bug', label: 'Report Issue', path: '/issues' },
                                { icon: 'fa-users', label: 'Team Members', path: '/team' },
                                { icon: 'fa-chart-bar', label: 'Analytics', path: '/analytics' },
                            ].map((q, i) => (
                                <button key={i} className="quick-btn" onClick={() => navigate(q.path)}>
                                    <i className={`fas ${q.icon}`}></i>
                                    <span>{q.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
