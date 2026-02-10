import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Topbar.css';

export default function Topbar() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search projects, tasks, issues..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <kbd>⌘K</kbd>
                </div>
            </div>
            <div className="topbar-right">
                <button className="topbar-btn" title="Notifications">
                    <i className="fas fa-bell"></i>
                    <span className="notification-dot"></span>
                </button>
                <button className="topbar-btn" title="Messages">
                    <i className="fas fa-envelope"></i>
                </button>
                <button className="topbar-btn" title="Help">
                    <i className="fas fa-question-circle"></i>
                </button>
                <div className="topbar-divider"></div>
                <div className="topbar-time">
                    <i className="fas fa-clock"></i>
                    <span>{dateStr} • {timeStr}</span>
                </div>
            </div>
        </header>
    );
}
