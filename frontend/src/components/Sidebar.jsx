import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Sidebar.css';

export default function Sidebar({ collapsed, onToggle }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const name = user?.full_name_display || user?.username || 'Admin';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    const navItems = [
        { label: 'Main', type: 'section' },
        { path: '/dashboard', icon: 'fa-th-large', label: 'Dashboard' },
        { path: '/projects', icon: 'fa-project-diagram', label: 'Projects' },
        { path: '/backlog', icon: 'fa-layer-group', label: 'Backlog' },
        { path: '/kanban', icon: 'fa-columns', label: 'Kanban Board' },
        { path: '/sprints', icon: 'fa-running', label: 'Sprints' },
        { label: 'Tracking', type: 'section' },
        { path: '/tasks', icon: 'fa-tasks', label: 'Tasks' },
        { path: '/issues', icon: 'fa-bug', label: 'Issues' },
        { path: '/epics', icon: 'fa-flag', label: 'Epics' },
        { label: 'Intelligence', type: 'section' },
        { path: '/analytics', icon: 'fa-chart-bar', label: 'Analytics' },
        { path: '/ai-insights', icon: 'fa-brain', label: 'AI Insights', badge: 'AI' },
        { label: 'Workspace', type: 'section' },
        { path: '/team', icon: 'fa-users', label: 'Team' },
        { path: '/wiki', icon: 'fa-book', label: 'Wiki' },
        { path: '/settings', icon: 'fa-cog', label: 'Settings' },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="logo-icon"><i className="fas fa-atom"></i></div>
                    {!collapsed && <span className="logo-text">CRM<span className="accent">.AI</span></span>}
                </div>
                <button className="sidebar-toggle" onClick={onToggle}>
                    <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                </button>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item, i) => {
                    if (item.type === 'section') {
                        return !collapsed && <div key={i} className="nav-section">{item.label}</div>;
                    }
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            title={collapsed ? item.label : ''}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            {!collapsed && <span>{item.label}</span>}
                            {!collapsed && item.badge && <span className="nav-badge pulse">{item.badge}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">{initials}</div>
                    {!collapsed && (
                        <>
                            <div className="user-info">
                                <span className="user-name">{name}</span>
                                <span className="user-role">{user?.is_superuser ? 'Administrator' : 'Member'}</span>
                            </div>
                            <button className="btn-logout" onClick={logout} title="Logout">
                                <i className="fas fa-sign-out-alt"></i>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}
