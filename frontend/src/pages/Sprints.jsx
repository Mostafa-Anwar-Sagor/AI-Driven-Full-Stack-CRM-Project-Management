import { useState, useEffect } from 'react';
import { projectsAPI, milestonesAPI } from '../services/api';

export default function Sprints() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newSprint, setNewSprint] = useState({ name: '', estimated_start: '', estimated_finish: '' });

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadSprints(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadSprints = async (pid) => {
        setLoading(true);
        try { const res = await milestonesAPI.list(pid); setSprints(res.data || []); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const createSprint = async (e) => {
        e.preventDefault();
        try {
            await milestonesAPI.create({ ...newSprint, project: selectedProject.id });
            setShowCreate(false); setNewSprint({ name: '', estimated_start: '', estimated_finish: '' });
            loadSprints(selectedProject.id);
        } catch (e) { alert('Error: ' + (e.response?.data?.detail || JSON.stringify(e.response?.data) || e.message)); }
    };

    const getProgress = (s) => {
        if (!s.total_points || s.total_points === 0) return 0;
        return Math.round(((s.closed_points || 0) / s.total_points) * 100);
    };

    const isActive = (s) => {
        const now = new Date();
        return new Date(s.estimated_start) <= now && new Date(s.estimated_finish) >= now;
    };

    return (
        <div className="tasks-page">
            <div className="page-header">
                <div><h1>Sprints</h1><p className="subtitle">Sprint planning and tracking</p></div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadSprints(p.id);
                    }}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> New Sprint</button>
                </div>
            </div>

            {loading ? <div className="loading-cell" style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> :
                sprints.length === 0 ? (
                    <div className="empty-state-large"><div className="empty-icon"><i className="fas fa-running"></i></div><h2>No Sprints</h2><p>Create your first sprint to start tracking progress</p></div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
                        {sprints.map(s => (
                            <div key={s.id} className="project-card" style={{ cursor: 'default' }}>
                                <div className="project-card-body" style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <h3 style={{ fontSize: '1.1rem' }}>{s.name}</h3>
                                        <span className={`status-badge ${isActive(s) ? 'open' : s.closed ? 'closed' : 'open'}`}>
                                            {isActive(s) ? '● Active' : s.closed ? 'Closed' : 'Planned'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
                                        <span><i className="fas fa-calendar-alt"></i> {new Date(s.estimated_start).toLocaleDateString()}</span>
                                        <span>→ {new Date(s.estimated_finish).toLocaleDateString()}</span>
                                    </div>
                                    <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                        <span style={{ color: '#94a3b8' }}>Progress</span>
                                        <span style={{ color: '#6366f1', fontWeight: 600 }}>{getProgress(s)}%</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1a2235', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${getProgress(s)}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(99,102,241,0.1)', fontSize: '0.8rem', color: '#64748b' }}>
                                        <span><i className="fas fa-star"></i> {s.total_points || 0} points</span>
                                        <span><i className="fas fa-check"></i> {s.closed_points || 0} closed</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Create Sprint</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createSprint}>
                            <div className="modal-body">
                                <div className="form-group"><label>Sprint Name *</label><input type="text" value={newSprint.name} onChange={e => setNewSprint({ ...newSprint, name: e.target.value })} required placeholder="Sprint 1" /></div>
                                <div className="form-group"><label>Start Date *</label><input type="date" value={newSprint.estimated_start} onChange={e => setNewSprint({ ...newSprint, estimated_start: e.target.value })} required /></div>
                                <div className="form-group"><label>End Date *</label><input type="date" value={newSprint.estimated_finish} onChange={e => setNewSprint({ ...newSprint, estimated_finish: e.target.value })} required /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-running"></i> Create Sprint</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
