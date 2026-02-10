import { useState, useEffect } from 'react';
import { projectsAPI, epicsAPI } from '../services/api';

export default function Epics() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [epics, setEpics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newEpic, setNewEpic] = useState({ subject: '', description: '', color: '#6366f1' });

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadEpics(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadEpics = async (pid) => {
        setLoading(true);
        try { const res = await epicsAPI.list(pid); setEpics(res.data || []); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const createEpic = async (e) => {
        e.preventDefault();
        try {
            await epicsAPI.create({ ...newEpic, project: selectedProject.id });
            setShowCreate(false); setNewEpic({ subject: '', description: '', color: '#6366f1' });
            loadEpics(selectedProject.id);
        } catch (e) { alert('Error creating epic'); }
    };

    return (
        <div className="tasks-page">
            <div className="page-header">
                <div><h1>Epics</h1><p className="subtitle">High-level feature tracking ({epics.length} epics)</p></div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadEpics(p.id);
                    }}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> New Epic</button>
                </div>
            </div>

            {loading ? <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> :
                epics.length === 0 ? (
                    <div className="empty-state-large"><div className="empty-icon"><i className="fas fa-flag"></i></div><h2>No Epics</h2><p>Create your first epic to organize user stories</p></div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                        {epics.map(epic => (
                            <div key={epic.id} className="project-card" style={{ cursor: 'default' }}>
                                <div className="project-color-bar" style={{ background: epic.color || '#6366f1' }}></div>
                                <div className="project-card-body" style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: (epic.color || '#6366f1') + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: epic.color || '#6366f1' }}>
                                            <i className="fas fa-flag"></i>
                                        </div>
                                        <div>
                                            <h3 style={{ fontSize: '1rem', marginBottom: 2 }}>#{epic.ref} — {epic.subject}</h3>
                                            <span className="status-badge open">{epic.status_extra_info?.name || 'New'}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px', lineHeight: 1.5 }}>{epic.description || 'No description'}</p>
                                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#64748b' }}>
                                        <span><i className="fas fa-list"></i> {epic.user_stories_counts?.total || 0} stories</span>
                                        <span><i className="fas fa-calendar"></i> {new Date(epic.created_date).toLocaleDateString()}</span>
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
                        <div className="modal-header"><h2>Create Epic</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createEpic}>
                            <div className="modal-body">
                                <div className="form-group"><label>Epic Title *</label><input type="text" value={newEpic.subject} onChange={e => setNewEpic({ ...newEpic, subject: e.target.value })} required placeholder="Feature name" /></div>
                                <div className="form-group"><label>Description</label><textarea value={newEpic.description} onChange={e => setNewEpic({ ...newEpic, description: e.target.value })} rows={4} placeholder="Describe the epic..."></textarea></div>
                                <div className="form-group"><label>Color</label><input type="color" value={newEpic.color} onChange={e => setNewEpic({ ...newEpic, color: e.target.value })} /></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-flag"></i> Create Epic</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
