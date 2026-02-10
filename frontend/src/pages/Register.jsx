import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth(); // To auto-login after register
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // Register
            await authAPI.register({
                username: formData.username,
                password: formData.password,
                email: formData.email,
                full_name: formData.fullName,
                type: 'public' // If backend requires type
            });

            // Auto Login - assuming register doesn't return token immediately or we want standard login flow
            await login(formData.username, formData.password);

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.detail || err.response?.data?.username?.[0] || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
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
                        <h1>Join CRM.AI</h1>
                        <p>Start your journey with the world's most intelligent project management platform.</p>
                    </div>
                    <div className="auth-features">
                        <div className="feature-item">
                            <div className="feature-icon" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}><i className="fas fa-rocket"></i></div>
                            <div className="feature-text">
                                <h3>14-Day Free Trial</h3>
                                <p>Full access to all enterprise features. No credit card required.</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon" style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399' }}><i className="fas fa-users"></i></div>
                            <div className="feature-text">
                                <h3>Unlimited Team Members</h3>
                                <p>Collaborate with your entire organization seamlessly.</p>
                            </div>
                        </div>
                    </div>
                    <div className="auth-footer-info">
                        <span>© 2026 CRM.AI</span>
                        <span>Privacy Policy</span>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-card">
                        <div className="auth-header">
                            <h2>Create Account</h2>
                            <p>Get started with your free account today</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-user-circle"></i>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-at"></i>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="johndoe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@company.com"
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Repeat password"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="auth-btn" disabled={loading}>
                                {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating Account...</> : <>Create Account <i className="fas fa-arrow-right"></i></>}
                            </button>

                            {error && (
                                <div className="auth-error">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{error}</span>
                                </div>
                            )}
                        </form>

                        <div className="auth-links">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
