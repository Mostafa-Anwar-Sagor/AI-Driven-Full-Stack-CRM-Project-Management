import { useState, useEffect } from 'react';
import { projectsAPI, userStoriesAPI } from '../services/api';

export default function Backlog() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newStory, setNewStory] = useState({ subject: '', description: '' });

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadStories(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadStories = async (pid) => {
        setLoading(true);
        try { const res = await userStoriesAPI.list(pid); setStories(res.data || []); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const createStory = async (e) => {
        e.preventDefault();
        try {
            await userStoriesAPI.create({ ...newStory, project: selectedProject.id });
            setShowCreate(false); setNewStory({ subject: '', description: '' });
            loadStories(selectedProject.id);
        } catch (e) { alert('Error creating user story'); }
    };

    const deleteStory = async (id) => {
        if (!confirm('Delete this user story?')) return;
        try { await userStoriesAPI.delete(id); loadStories(selectedProject.id); }
        catch (e) { alert('Error'); }
    };

    return (
        <div className="tasks-page">
            <div className="page-header">
                <div><h1>Backlog</h1><p className="subtitle">User stories and product backlog ({stories.length} items)</p></div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadStories(p.id);
                    }}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> New Story</button>
                </div>
            </div>

            <div className="issues-table-container">
                <table className="issues-table">
                    <thead><tr><th>Ref</th><th>User Story</th><th>Status</th><th>Points</th><th>Sprint</th><th>Assigned</th><th>Actions</th></tr></thead>
                    <tbody>
                        {loading ? <tr><td colSpan="7" className="loading-cell"><i className="fas fa-spinner fa-spin"></i> Loading...</td></tr> :
                            stories.length === 0 ? <tr><td colSpan="7" className="loading-cell">No user stories found</td></tr> :
                                stories.map(s => (
                                    <tr key={s.id}>
                                        <td><span className="task-ref">#{s.ref}</span></td>
                                        <td className="issue-subject">{s.subject}</td>
                                        <td><span className="status-badge open">{s.status_extra_info?.name || 'New'}</span></td>
                                        <td>{s.total_points ? Object.values(s.total_points).reduce((a, b) => a + (b || 0), 0) : '—'}</td>
                                        <td>{s.milestone_name || <span className="text-muted">Unassigned</span>}</td>
                                        <td>{s.assigned_to_extra_info?.full_name_display || <span className="text-muted">Unassigned</span>}</td>
                                        <td><button className="icon-btn danger" onClick={() => deleteStory(s.id)}><i className="fas fa-trash"></i></button></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Create User Story</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createStory}>
                            <div className="modal-body">
                                <div className="form-group"><label>Story Title *</label><input type="text" value={newStory.subject} onChange={e => setNewStory({ ...newStory, subject: e.target.value })} required placeholder="As a user, I want to..." /></div>
                                <div className="form-group"><label>Description</label><textarea value={newStory.description} onChange={e => setNewStory({ ...newStory, description: e.target.value })} rows={4} placeholder="Acceptance criteria..."></textarea></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-plus"></i> Create Story</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
