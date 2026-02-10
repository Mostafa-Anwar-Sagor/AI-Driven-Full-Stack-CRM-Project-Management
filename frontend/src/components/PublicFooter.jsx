import { Link } from 'react-router-dom';
import '../styles/Public.css';

export default function PublicFooter() {
    return (
        <footer className="public-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <div className="nav-logo">
                        <div className="logo-icon"><i className="fas fa-atom"></i></div>
                        <span className="logo-text">CRM<span className="accent">.AI</span></span>
                    </div>
                    <p>The world's most advanced AI-driven customer relationship and project management platform. Built for modern teams.</p>
                </div>
                <div className="footer-col">
                    <h4>Product</h4>
                    <Link to="/features">Features</Link>
                    <Link to="/solutions">Solutions</Link>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/register">Start Free Trial</Link>
                </div>
                <div className="footer-col">
                    <h4>Resources</h4>
                    <Link to="/wiki">Documentation</Link>
                    <Link to="/api">API Reference</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/community">Community</Link>
                </div>
                <div className="footer-col">
                    <h4>Company</h4>
                    <Link to="/about">About Us</Link>
                    <Link to="/careers">Careers</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/legal">Privacy & Terms</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 CRM.AI Platform. All rights reserved.</p>
            </div>
        </footer>
    );
}
