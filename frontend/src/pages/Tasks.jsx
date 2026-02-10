import { useState, useEffect } from 'react';
import { projectsAPI, tasksAPI, statusesAPI } from '../services/api';
import '../styles/Tasks.css';

export default function Tasks() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newTask, setNewTask] = useState({ subject: '', description: '' });
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        projectsAPI.list().then(res => {
            const p = res.data || [];
            setProjects(p);
            if (p.length > 0) { setSelectedProject(p[0]); loadTasks(p[0].id); }
            else setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const loadTasks = async (projectId) => {
        setLoading(true);
        try {
            const res = await tasksAPI.list(projectId);
            setTasks(res.data || []);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const createTask = async (e) => {
        e.preventDefault();
        if (!selectedProject) return;
        try {
            await tasksAPI.create({ ...newTask, project: selectedProject.id });
            setShowCreate(false);
            setNewTask({ subject: '', description: '' });
            loadTasks(selectedProject.id);
        } catch (e) { alert('Error creating task'); }
    };

    const deleteTask = async (id) => {
        if (!confirm('Delete this task?')) return;
        try { await tasksAPI.delete(id); loadTasks(selectedProject.id); }
        catch (e) { alert('Error deleting'); }
    };

    const getStatus = (t) => (t.status_extra_info?.name || 'New').toLowerCase();
    const getPriority = (t) => {
        const status = getStatus(t);
        if (status.includes('closed') || status.includes('done')) return 'done';
        if (status.includes('progress')) return 'progress';
        return 'new';
    };

    const filtered = filter === 'all' ? tasks : tasks.filter(t => getPriority(t) === filter);

    return (
        <div className="tasks-page">
            <div className="page-header">
                <div>
                    <h1>Tasks</h1>
                    <p className="subtitle">Manage tasks across your projects ({tasks.length} total)</p>
                </div>
                <div className="header-actions">
                    <select className="project-select" value={selectedProject?.id || ''} onChange={e => {
                        const p = projects.find(pr => pr.id === parseInt(e.target.value));
                        setSelectedProject(p); loadTasks(p.id);
                    }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}><i className="fas fa-plus"></i> New Task</button>
                </div>
            </div>

            <div className="filter-bar">
                {['all', 'new', 'progress', 'done'].map(f => (
                    <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                        {f === 'all' ? 'All' : f === 'new' ? 'New' : f === 'progress' ? 'In Progress' : 'Done'}
                        <span className="filter-count">{f === 'all' ? tasks.length : tasks.filter(t => getPriority(t) === f).length}</span>
                    </button>
                ))}
            </div>

            <div className="tasks-table-container">
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th>Ref</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Assigned To</th>
                            <th>User Story</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="7" className="loading-cell"><i className="fas fa-spinner fa-spin"></i> Loading tasks...</td></tr> :
                            filtered.length === 0 ? <tr><td colSpan="7" className="loading-cell">No tasks found</td></tr> :
                                filtered.map(t => (
                                    <tr key={t.id}>
                                        <td><span className="task-ref">#{t.ref}</span></td>
                                        <td className="task-subject">{t.subject}</td>
                                        <td><span className={`status-badge status-${getPriority(t)}`}>{t.status_extra_info?.name || 'New'}</span></td>
                                        <td>{t.assigned_to_extra_info?.full_name_display || <span className="text-muted">Unassigned</span>}</td>
                                        <td>{t.user_story_extra_info?.subject ? <span className="story-link">#{t.user_story_extra_info.ref}</span> : '—'}</td>
                                        <td className="text-muted">{new Date(t.created_date).toLocaleDateString()}</td>
                                        <td>
                                            <button className="icon-btn" onClick={() => deleteTask(t.id)} title="Delete"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h2>Create Task</h2><button className="modal-close" onClick={() => setShowCreate(false)}><i className="fas fa-times"></i></button></div>
                        <form onSubmit={createTask}>
                            <div className="modal-body">
                                <div className="form-group"><label>Task Title *</label><input type="text" value={newTask.subject} onChange={e => setNewTask({ ...newTask, subject: e.target.value })} required placeholder="Enter task title" /></div>
                                <div className="form-group"><label>Description</label><textarea value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} rows={4} placeholder="Describe the task..."></textarea></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary"><i className="fas fa-plus"></i> Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
