import { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import '../styles/Team.css';

export default function Team() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        usersAPI.list().then(res => { setUsers(res.data || []); setLoading(false); }).catch(() => setLoading(false));
    }, []);

    const colors = ['#6366f1,#818cf8', '#8b5cf6,#a78bfa', '#ec4899,#f472b6', '#14b8a6,#2dd4bf', '#f59e0b,#fbbf24', '#10b981,#34d399'];
    const filtered = users.filter(u => (u.full_name_display || u.username || '').toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="team-page">
            <div className="page-header">
                <div>
                    <h1>Team</h1>
                    <p className="subtitle">Your team members and collaborators ({users.length} members)</p>
                </div>
                <div className="header-actions">
                    <div className="search-input">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search team members..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="team-stats-row">
                <div className="team-stat"><span className="team-stat-value">{users.length}</span><span className="team-stat-label">Total Members</span></div>
                <div className="team-stat"><span className="team-stat-value">{users.filter(u => u.is_active).length}</span><span className="team-stat-label">Active</span></div>
                <div className="team-stat"><span className="team-stat-value">{users.filter(u => u.is_superuser).length}</span><span className="team-stat-label">Admins</span></div>
            </div>

            {loading ? (
                <div className="team-grid"><div className="skeleton-card"></div><div className="skeleton-card"></div><div className="skeleton-card"></div></div>
            ) : filtered.length === 0 ? (
                <div className="empty-state-large"><div className="empty-icon"><i className="fas fa-users"></i></div><h2>No team members found</h2></div>
            ) : (
                <div className="team-grid">
                    {filtered.map((u, i) => {
                        const name = u.full_name_display || u.full_name || u.username;
                        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                        return (
                            <div key={u.id} className="team-card">
                                <div className="team-card-bg" style={{ background: `linear-gradient(135deg, ${colors[i % colors.length]})` }}></div>
                                <div className="team-card-content">
                                    <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${colors[i % colors.length]})` }}>
                                        {u.photo ? <img src={u.photo} alt={name} /> : initials}
                                    </div>
                                    <h3>{name}</h3>
                                    <span className="team-role-badge">{u.is_superuser ? 'Administrator' : 'Team Member'}</span>
                                    <span className="team-email">{u.email || u.username}</span>
                                    <div className="team-card-footer">
                                        <span className={`status-indicator ${u.is_active ? 'active' : 'inactive'}`}>
                                            <span className="status-dot"></span>
                                            {u.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                        <span className="join-date"><i className="fas fa-calendar"></i> {new Date(u.date_joined || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
