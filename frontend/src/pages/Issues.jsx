import { useState, useEffect } from 'react';
import { projectsAPI, issuesAPI } from '../services/api';
import '../styles/Issues.css';

export default function Issues() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newIssue, setNewIssue] = useState({ subject: '', description: '', priority: 3, severity: 3, type: 1 });

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadIssues(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadIssues = async (projectId) => {
        setLoading(true);
        try { const res = await issuesAPI.list(projectId); setIssues(res.data || []); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const createIssue = async (e) => {
        e.preventDefault();
        if (!selectedProject) return;
        try {
            await issuesAPI.create({ ...newIssue, project: selectedProject.id });
            setShowCreate(false);
            setNewIssue({ subject: '', description: '', priority: 3, severity: 3, type: 1 });
            loadIssues(selectedProject.id);
        } catch (e) { alert('Error creating issue'); }
    };

    const deleteIssue = async (id) => {
        if (!confirm('Delete this issue?')) return;
        try { await issuesAPI.delete(id); loadIssues(selectedProject.id); } catch (e) { alert('Error'); }
    };

    const getPriorityClass = (issue) => {
        const p = (issue.priority_extra_info?.name || '').toLowerCase();
        if (p.includes('high') || p.includes('critical')) return 'high';
        if (p.includes('low')) return 'low';
        return 'normal';
    };

    const getSeverityIcon = (issue) => {
        const s = (issue.severity_extra_info?.name || '').toLowerCase();
        if (s.includes('critical') || s.includes('wishlist')) return 'fa-exclamation-triangle';
        return 'fa-flag';
    };

    return (
        <div className="issues-page">
            <div className="page-header">
                <div>
                    <h1>Issues</h1>
                    <p className="subtitle">Bug tracking and issue management ({issues.length} total)</p>
                </div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadIssues(p.id);
                    }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> Report Issue</button>
                </div>
            </div>

            <div className="issues-stats">
                <div className="issue-stat-card">
                    <div className="issue-stat-icon open"><i className="fas fa-exclamation-circle"></i></div>
                    <div><span className="issue-stat-value">{issues.filter(i => !(i.status_extra_info?.name || '').toLowerCase().includes('closed')).length}</span><span className="issue-stat-label">Open</span></div>
                </div>
                <div className="issue-stat-card">
                    <div className="issue-stat-icon progress"><i className="fas fa-spinner"></i></div>
                    <div><span className="issue-stat-value">{issues.filter(i => (i.status_extra_info?.name || '').toLowerCase().includes('progress')).length}</span><span className="issue-stat-label">In Progress</span></div>
                </div>
                <div className="issue-stat-card">
                    <div className="issue-stat-icon closed"><i className="fas fa-check-circle"></i></div>
                    <div><span className="issue-stat-value">{issues.filter(i => (i.status_extra_info?.name || '').toLowerCase().includes('closed')).length}</span><span className="issue-stat-label">Closed</span></div>
                </div>
                <div className="issue-stat-card">
                    <div className="issue-stat-icon critical"><i className="fas fa-fire"></i></div>
                    <div><span className="issue-stat-value">{issues.filter(i => getPriorityClass(i) === 'high').length}</span><span className="issue-stat-label">Critical</span></div>
                </div>
            </div>

            <div className="issues-table-container">
                <table className="issues-table">
                    <thead>
                        <tr><th>ID</th><th>Issue</th><th>Status</th><th>Priority</th><th>Type</th><th>Severity</th><th>Assigned</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="8" className="loading-cell"><i className="fas fa-spinner fa-spin"></i> Loading...</td></tr> :
                            issues.length === 0 ? <tr><td colSpan="8" className="loading-cell"><i className="fas fa-bug"></i> No issues found</td></tr> :
                                issues.map(issue => (
                                    <tr key={issue.id}>
                                        <td><span className="issue-ref">#{issue.ref}</span></td>
                                        <td className="issue-subject"><span>{issue.subject}</span></td>
                                        <td><span className={`status-badge ${(issue.status_extra_info?.name || '').toLowerCase().includes('closed') ? 'closed' : 'open'}`}>{issue.status_extra_info?.name || 'New'}</span></td>
                                        <td><span className={`priority-badge ${getPriorityClass(issue)}`}><i className={`fas ${getSeverityIcon(issue)}`}></i> {issue.priority_extra_info?.name || 'Normal'}</span></td>
                                        <td><span className="type-badge">{issue.type_extra_info?.name || 'Bug'}</span></td>
                                        <td>{issue.severity_extra_info?.name || '—'}</td>
                                        <td>{issue.assigned_to_extra_info?.full_name_display || <span className="text-muted">Unassigned</span>}</td>
                                        <td><button className="icon-btn danger" onClick={() => deleteIssue(issue.id)}><i className="fas fa-trash"></i></button></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Report Issue</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createIssue}>
                            <div className="modal-body">
                                <div className="form-group"><label>Issue Title *</label><input type="text" value={newIssue.subject} onChange={e => setNewIssue({ ...newIssue, subject: e.target.value })} required placeholder="Describe the issue" /></div>
                                <div className="form-group"><label>Description</label><textarea value={newIssue.description} onChange={e => setNewIssue({ ...newIssue, description: e.target.value })} rows={4} placeholder="Detailed description..."></textarea></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-bug"></i> Submit Issue</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
