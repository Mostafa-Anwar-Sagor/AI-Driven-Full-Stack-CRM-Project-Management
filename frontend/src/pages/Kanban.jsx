import { useState, useEffect } from 'react';
import { projectsAPI, userStoriesAPI, tasksAPI } from '../services/api';
import '../styles/Kanban.css';

export default function Kanban() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadStories(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadStories = async (projectId) => {
        setLoading(true);
        try {
            const res = await userStoriesAPI.list(projectId);
            setStories(res.data || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const columns = [
        { key: 'new', label: 'New', color: '#6366f1', icon: 'fa-circle-dot' },
        { key: 'ready', label: 'Ready', color: '#f59e0b', icon: 'fa-circle-check' },
        { key: 'progress', label: 'In Progress', color: '#8b5cf6', icon: 'fa-spinner' },
        { key: 'test', label: 'Ready for Test', color: '#14b8a6', icon: 'fa-vial' },
        { key: 'done', label: 'Done', color: '#10b981', icon: 'fa-circle-check' },
    ];

    const getColumn = (story) => {
        const status = (story.status_extra_info?.name || '').toLowerCase();
        if (status.includes('done') || status.includes('closed') || status.includes('archived')) return 'done';
        if (status.includes('test') || status.includes('review')) return 'test';
        if (status.includes('progress') || status.includes('started')) return 'progress';
        if (status.includes('ready')) return 'ready';
        return 'new';
    };

    const groupedStories = columns.reduce((acc, col) => {
        acc[col.key] = stories.filter(s => getColumn(s) === col.key);
        return acc;
    }, {});

    return (
        <div className="kanban-page">
            <div className="page-header">
                <div>
                    <h1>Kanban Board</h1>
                    <p className="subtitle">Visualize and manage your workflow</p>
                </div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadStories(p.id);
                    }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
            </div>

            <div className="kanban-board">
                {columns.map(col => (
                    <div key={col.key} className="kanban-column">
                        <div className="column-header" style={{ '--col-color': col.color }}>
                            <div className="column-title">
                                <span className="column-dot" style={{ background: col.color }}></span>
                                <h3>{col.label}</h3>
                                <span className="column-count">{groupedStories[col.key]?.length || 0}</span>
                            </div>
                        </div>
                        <div className="column-body">
                            {loading ? <div className="skeleton-card small"></div> :
                                (groupedStories[col.key] || []).length === 0 ?
                                    <div className="column-empty"><i className="fas fa-inbox"></i><p>No items</p></div> :
                                    groupedStories[col.key].map(story => (
                                        <div key={story.id} className="kanban-card">
                                            <div className="kanban-card-top">
                                                <span className="card-ref">#{story.ref}</span>
                                                {story.is_blocked && <span className="blocked-badge"><i className="fas fa-ban"></i></span>}
                                            </div>
                                            <h4>{story.subject}</h4>
                                            {story.tags?.length > 0 && (
                                                <div className="card-tags">
                                                    {story.tags.slice(0, 2).map((t, i) => <span key={i} className="mini-tag" style={{ background: t[1] || '#6366f1' }}>{t[0]}</span>)}
                                                </div>
                                            )}
                                            <div className="kanban-card-footer">
                                                <div className="card-points">{story.total_points ? `${Object.values(story.total_points).reduce((a, b) => a + (b || 0), 0)} pts` : ''}</div>
                                                <div className="card-avatar">
                                                    {story.assigned_to_extra_info ?
                                                        <span className="mini-avatar" title={story.assigned_to_extra_info.full_name_display}>
                                                            {(story.assigned_to_extra_info.full_name_display || 'U')[0]}
                                                        </span> : <span className="mini-avatar unassigned"><i className="fas fa-user"></i></span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
