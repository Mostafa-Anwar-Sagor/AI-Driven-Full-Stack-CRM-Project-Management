import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Public.css';

export default function PublicNavbar() {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="public-nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon"><i className="fas fa-atom"></i></div>
                    <span className="logo-text">CRM<span className="accent">.AI</span></span>
                </Link>

                <div className="nav-links">
                    <Link to="/features" className={`nav-link ${isActive('/features')}`}>Features</Link>
                    <Link to="/solutions" className={`nav-link ${isActive('/solutions')}`}>Solutions</Link>
                    <Link to="/pricing" className={`nav-link ${isActive('/pricing')}`}>Pricing</Link>

                    <div className="nav-auth">
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="btn btn-primary">
                                <i className="fas fa-th-large"></i> Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Log In</Link>
                                <Link to="/register" className="btn btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
