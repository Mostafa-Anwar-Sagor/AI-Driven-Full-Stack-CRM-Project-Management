import { useState, useEffect } from 'react';
import { projectsAPI, wikiAPI } from '../services/api';

export default function Wiki() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newPage, setNewPage] = useState({ slug: '', content: '' });

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadPages(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadPages = async (pid) => {
        setLoading(true);
        try { const res = await wikiAPI.list(pid); setPages(res.data || []); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const createPage = async (e) => {
        e.preventDefault();
        try {
            await wikiAPI.create({ ...newPage, project: selectedProject.id });
            setShowCreate(false); setNewPage({ slug: '', content: '' });
            loadPages(selectedProject.id);
        } catch (e) { alert('Error creating wiki page'); }
    };

    return (
        <div className="tasks-page">
            <div className="page-header">
                <div><h1>Wiki</h1><p className="subtitle">Project documentation and knowledge base</p></div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadPages(p.id);
                    }}>{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> New Page</button>
                </div>
            </div>

            {loading ? <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}><i className="fas fa-spinner fa-spin"></i> Loading...</div> :
                pages.length === 0 ? (
                    <div className="empty-state-large"><div className="empty-icon"><i className="fas fa-book"></i></div><h2>No Wiki Pages</h2><p>Create your first wiki page to start documenting</p></div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                        {pages.map(page => (
                            <div key={page.id} className="project-card" style={{ cursor: 'default' }}>
                                <div className="project-card-body" style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                        <h3 style={{ fontSize: '1rem' }}>{page.slug}</h3>
                                    </div>
                                    <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, maxHeight: '80px', overflow: 'hidden' }}>{page.content?.substring(0, 200) || 'Empty page'}</p>
                                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(99,102,241,0.1)', fontSize: '0.75rem', color: '#64748b' }}>
                                        <span><i className="fas fa-user"></i> {page.owner_name || 'Admin'}</span>
                                        <span><i className="fas fa-clock"></i> {new Date(page.modified_date || page.created_date).toLocaleDateString()}</span>
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
                        <div className="modal-header"><h2>Create Wiki Page</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createPage}>
                            <div className="modal-body">
                                <div className="form-group"><label>Page Title (slug) *</label><input type="text" value={newPage.slug} onChange={e => setNewPage({ ...newPage, slug: e.target.value })} required placeholder="getting-started" /></div>
                                <div className="form-group"><label>Content</label><textarea value={newPage.content} onChange={e => setNewPage({ ...newPage, content: e.target.value })} rows={8} placeholder="Write your documentation here (Markdown supported)..."></textarea></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-book"></i> Create Page</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
