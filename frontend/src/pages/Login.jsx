import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Login() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123123');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.status === 400 ? 'Invalid username or password' : 'Connection error. Please check your internet.');
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-orb orb-1"></div>
                <div className="auth-orb orb-2"></div>
                <div className="auth-overlay"></div>
            </div>

            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-brand">
                        <div className="logo-icon mb-4"><i className="fas fa-atom fa-2x"></i></div>
                        <h1>Welcome Back</h1>
                        <p>Access your intelligent workspace and continue building great things.</p>
                    </div>
                    <div className="auth-features">
                        <div className="feature-item">
                            <div className="feature-icon" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}><i className="fas fa-brain"></i></div>
                            <div className="feature-text">
                                <h3>AI-Powered Insights</h3>
                                <p>Get real-time predictions on project risks and opportunities.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon" style={{ background: 'rgba(236,72,153,0.2)', color: '#f472b6' }}><i className="fas fa-shield-alt"></i></div>
                            <div className="feature-text">
                                <h3>Secure Environment</h3>
                                <p>Your data is encrypted and protected with enterprise-grade security.</p>
                            </div>
                        </div>
                    </div>
                    <div className="auth-footer-info">
                        <span>© 2026 CRM.AI</span>
                        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}><i className="fas fa-home"></i> Back to Home</Link>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-card">
                        <div className="auth-header">
                            <h2>Sign In</h2>
                            <p>Enter your credentials to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-options" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input type="checkbox" defaultChecked /> Remember me
                                </label>
                                <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Forgot password?</a>
                            </div>

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</> : <>Sign In <i className="fas fa-arrow-right"></i></>}
                            </button>

                            {error && (
                                <div className="auth-error">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{error}</span>
                                </div>
                            )}
                        </form>

                        <div className="auth-links">
                            Don't have an account? <Link to="/register">Sign Up Free</Link>
                        </div>

                        <div className="auth-divider"><span>Demo Access</span></div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>User: <strong>admin</strong></span>
                            <span>Pass: <strong>123123</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
