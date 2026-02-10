import { useState, useEffect } from 'react';
import { projectsAPI, membershipsAPI } from '../services/api';
import '../styles/Projects.css';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('grid');
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '', is_private: false });
    const [creating, setCreating] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectDetail, setProjectDetail] = useState(null);

    useEffect(() => { loadProjects(); }, []);

    const loadProjects = async () => {
        try {
            const res = await projectsAPI.list();
            setProjects(res.data || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const createProject = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await projectsAPI.create({ ...newProject, creation_template: 1 });
            setShowModal(false);
            setNewProject({ name: '', description: '', is_private: false });
            loadProjects();
        } catch (e) { console.error(e); alert('Failed to create project: ' + (e.response?.data?.detail || e.message)); }
        setCreating(false);
    };

    const openProject = async (project) => {
        setSelectedProject(project);
        try {
            const [statsRes, membRes] = await Promise.all([
                projectsAPI.getStats(project.id).catch(() => null),
                membershipsAPI.list(project.id).catch(() => ({ data: [] })),
            ]);
            setProjectDetail({ stats: statsRes?.data, members: membRes?.data || [] });
        } catch (e) { setProjectDetail(null); }
    };

    const deleteProject = async (id) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await projectsAPI.delete(id);
            setSelectedProject(null);
            loadProjects();
        } catch (e) { alert('Failed to delete: ' + (e.response?.data?.detail || e.message)); }
    };

    const colors = ['#6366f1,#818cf8', '#8b5cf6,#a78bfa', '#ec4899,#f472b6', '#14b8a6,#2dd4bf', '#f59e0b,#fbbf24', '#10b981,#34d399', '#ef4444,#f87171', '#06b6d4,#22d3ee'];
    const getColor = (i) => colors[i % colors.length];
    const getIcon = (name) => {
        const n = (name || '').toLowerCase();
        if (n.includes('api') || n.includes('backend')) return 'fa-server';
        if (n.includes('front') || n.includes('ui')) return 'fa-palette';
        if (n.includes('mobile')) return 'fa-mobile-alt';
        if (n.includes('design')) return 'fa-pen-nib';
        return 'fa-folder';
    };

    return (
        <div className="projects-page">
            <div className="page-header">
                <div>
                    <h1>Projects</h1>
                    <p className="subtitle">Manage and track all your projects ({projects.length} total)</p>
                </div>
                <div className="header-actions">
                    <div className="view-toggle">
                        <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><i className="fas fa-th"></i></button>
                        <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><i className="fas fa-list"></i></button>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> New Project</button>
                </div>
            </div>

            {loading ? (
                <div className="projects-grid"><div className="skeleton-card"></div><div className="skeleton-card"></div><div className="skeleton-card"></div></div>
            ) : projects.length === 0 ? (
                <div className="empty-state-large">
                    <div className="empty-icon"><i className="fas fa-folder-open"></i></div>
                    <h2>No Projects Yet</h2>
                    <p>Create your first project to start managing tasks, issues, and collaborate with your team.</p>
                    <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Create First Project</button>
                </div>
            ) : (
                <div className={view === 'grid' ? 'projects-grid' : 'projects-list-view'}>
                    {projects.map((p, i) => (
                        <div key={p.id} className={`project-card ${view}`} onClick={() => openProject(p)}>
                            <div className="project-color-bar" style={{ background: `linear-gradient(90deg, ${getColor(i)})` }}></div>
                            <div className="project-card-body">
                                <div className="project-card-top">
                                    <div className="project-icon" style={{ background: `linear-gradient(135deg, ${getColor(i)})` }}>
                                        <i className={`fas ${getIcon(p.name)}`}></i>
                                    </div>
                                    <span className={`privacy-badge ${p.is_private ? 'private' : 'public'}`}>
                                        <i className={`fas fa-${p.is_private ? 'lock' : 'globe'}`}></i> {p.is_private ? 'Private' : 'Public'}
                                    </span>
                                </div>
                                <h3>{p.name}</h3>
                                <p className="project-desc">{p.description || 'No description provided'}</p>
                                <div className="project-tags">
                                    {(p.tags || []).slice(0, 3).map((tag, ti) => <span key={ti} className="tag">{tag[0] || tag}</span>)}
                                </div>
                                <div className="project-footer">
                                    <div className="project-stat"><i className="fas fa-users"></i> {p.total_memberships || 0}</div>
                                    <div className="project-stat"><i className="fas fa-heart"></i> {p.total_fans || 0}</div>
                                    <div className="project-stat"><i className="fas fa-clock"></i> {new Date(p.created_date).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Project</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}><i className="fas fa-times"></i></button>
                        </div>
                        <form onSubmit={createProject}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Project Name *</label>
                                    <input type="text" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} placeholder="Enter project name" required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} placeholder="Describe your project..." rows={4}></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input type="checkbox" checked={newProject.is_private} onChange={e => setNewProject({ ...newProject, is_private: e.target.checked })} />
                                        <span className="custom-checkbox"></span>
                                        Private Project
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={creating}>
                                    {creating ? <><i className="fas fa-spinner fa-spin"></i> Creating...</> : <><i className="fas fa-plus"></i> Create Project</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Project Detail Drawer */}
            {selectedProject && (
                <div className="drawer-overlay" onClick={() => setSelectedProject(null)}>
                    <div className="drawer" onClick={e => e.stopPropagation()}>
                        <div className="drawer-header">
                            <h2>{selectedProject.name}</h2>
                            <button className="modal-close" onClick={() => setSelectedProject(null)}><i className="fas fa-times"></i></button>
                        </div>
                        <div className="drawer-body">
                            <div className="detail-section">
                                <h4>Description</h4>
                                <p>{selectedProject.description || 'No description'}</p>
                            </div>
                            <div className="detail-section">
                                <h4>Project Info</h4>
                                <div className="detail-grid">
                                    <div className="detail-item"><span className="detail-label">Owner</span><span>{selectedProject.owner?.full_name_display || 'Admin'}</span></div>
                                    <div className="detail-item"><span className="detail-label">Created</span><span>{new Date(selectedProject.created_date).toLocaleDateString()}</span></div>
                                    <div className="detail-item"><span className="detail-label">Privacy</span><span>{selectedProject.is_private ? 'Private' : 'Public'}</span></div>
                                    <div className="detail-item"><span className="detail-label">Members</span><span>{selectedProject.total_memberships || 0}</span></div>
                                </div>
                            </div>
                            {projectDetail?.members?.length > 0 && (
                                <div className="detail-section">
                                    <h4>Team Members</h4>
                                    <div className="members-list">
                                        {projectDetail.members.map((m, i) => (
                                            <div key={i} className="member-row">
                                                <div className="member-avatar">{(m.full_name || m.username || 'U')[0].toUpperCase()}</div>
                                                <div className="member-info">
                                                    <span className="member-name">{m.full_name || m.username}</span>
                                                    <span className="member-role">{m.role_name || 'Member'}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="drawer-actions">
                                <button className="btn btn-danger" onClick={() => deleteProject(selectedProject.id)}><i className="fas fa-trash"></i> Delete Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
