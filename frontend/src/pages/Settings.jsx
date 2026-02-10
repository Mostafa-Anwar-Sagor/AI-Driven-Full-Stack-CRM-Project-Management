import { useAuth } from '../context/AuthContext';
import '../styles/Settings.css';

export default function Settings() {
    const { user } = useAuth();

    return (
        <div className="settings-page">
            <div className="page-header">
                <div><h1>Settings</h1><p className="subtitle">Configure your workspace and preferences</p></div>
            </div>

            <div className="settings-grid">
                <div className="settings-card">
                    <div className="settings-card-header">
                        <i className="fas fa-user-circle"></i>
                        <h3>Profile</h3>
                    </div>
                    <div className="settings-body">
                        <div className="setting-row"><label>Full Name</label><input type="text" defaultValue={user?.full_name_display || user?.username || 'Admin'} className="settings-input" /></div>
                        <div className="setting-row"><label>Email</label><input type="email" defaultValue={user?.email || ''} className="settings-input" /></div>
                        <div className="setting-row"><label>Username</label><input type="text" defaultValue={user?.username || ''} className="settings-input" readOnly /></div>
                        <div className="setting-row"><label>Bio</label><textarea className="settings-input" rows={3} defaultValue={user?.bio || ''} placeholder="Tell us about yourself..."></textarea></div>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-header">
                        <i className="fas fa-server"></i>
                        <h3>API Configuration</h3>
                    </div>
                    <div className="settings-body">
                        <div className="setting-row"><label>API Base URL</label><input type="text" defaultValue="http://127.0.0.1:8000" className="settings-input" /></div>
                        <div className="setting-row"><label>API Version</label><input type="text" defaultValue="v1" className="settings-input" readOnly /></div>
                        <div className="setting-row"><label>Token</label><input type="text" value={localStorage.getItem('crm_token')?.substring(0, 24) + '...' || '—'} className="settings-input" readOnly /></div>
                        <div className="setting-row"><label>CORS</label><span className="status-badge open">Enabled</span></div>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-header">
                        <i className="fas fa-palette"></i>
                        <h3>Appearance</h3>
                    </div>
                    <div className="settings-body">
                        <div className="setting-row"><label>Theme</label><select className="settings-input"><option>Dark Mode</option><option>Light Mode</option><option>System</option></select></div>
                        <div className="setting-row"><label>Accent Color</label><input type="color" defaultValue="#6366f1" className="settings-input" style={{ height: 40, padding: '4px' }} /></div>
                        <div className="setting-row"><label>Sidebar</label><select className="settings-input"><option>Expanded</option><option>Collapsed</option></select></div>
                        <div className="setting-row"><label>Animations</label><select className="settings-input"><option>Enabled</option><option>Reduced</option><option>Disabled</option></select></div>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-header">
                        <i className="fas fa-bell"></i>
                        <h3>Notifications</h3>
                    </div>
                    <div className="settings-body">
                        <div className="setting-row"><label>Email Notifications</label><label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label></div>
                        <div className="setting-row"><label>Push Notifications</label><label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label></div>
                        <div className="setting-row"><label>Task Assignments</label><label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider"></span></label></div>
                        <div className="setting-row"><label>Project Updates</label><label className="toggle"><input type="checkbox" /><span className="toggle-slider"></span></label></div>
                    </div>
                </div>

                <div className="settings-card full-width">
                    <div className="settings-card-header">
                        <i className="fas fa-info-circle"></i>
                        <h3>About</h3>
                    </div>
                    <div className="settings-body">
                        <div className="about-grid">
                            <div className="about-item"><span className="about-label">Platform</span><span className="about-value">CRM.AI — AI-Driven CRM & Project Management</span></div>
                            <div className="about-item"><span className="about-label">Version</span><span className="about-value">2.0.0</span></div>
                            <div className="about-item"><span className="about-label">Frontend</span><span className="about-value">React 19 + Vite + Chart.js</span></div>
                            <div className="about-item"><span className="about-label">Backend</span><span className="about-value">Django 3.2 + Django REST Framework</span></div>
                            <div className="about-item"><span className="about-label">Database</span><span className="about-value">PostgreSQL 17</span></div>
                            <div className="about-item"><span className="about-label">AI Models</span><span className="about-value">Random Forest, LSTM, XGBoost, BERT, RL</span></div>
                            <div className="about-item"><span className="about-label">Developer</span><span className="about-value">Mostafa Anwar</span></div>
                            <div className="about-item"><span className="about-label">License</span><span className="about-value">AGPL-3.0</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
