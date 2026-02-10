import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import '../styles/Public.css';

export default function Pricing() {
    return (
        <div className="public-page">
            <PublicNavbar />
            <div className="public-content">
                <header className="page-header-section">
                    <h1 className="page-title">Simple, Transparent Pricing</h1>
                    <p className="page-subtitle">Choose the plan that fits your team's needs. No hidden fees.</p>
                </header>

                <div className="pricing-grid">
                    {/* Starter Plan */}
                    <div className="price-card">
                        <div className="price-name">Starter</div>
                        <div className="price-amount">$0</div>
                        <div className="price-period">Free forever for up to 5 users</div>
                        <ul className="price-features">
                            <li><i className="fas fa-check"></i> Unlimited Projects</li>
                            <li><i className="fas fa-check"></i> 1GB Storage</li>
                            <li><i className="fas fa-check"></i> Basic CRM</li>
                            <li><i className="fas fa-check"></i> Kanban Boards</li>
                            <li className="disabled"><i className="fas fa-times"></i> AI Insights</li>
                            <li className="disabled"><i className="fas fa-times"></i> Advanced Analytics</li>
                        </ul>
                        <button className="btn-price">Get Started</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="price-card popular">
                        <div className="popular-badge">Most Popular</div>
                        <div className="price-name">Professional</div>
                        <div className="price-amount">$29</div>
                        <div className="price-period">per user / month</div>
                        <ul className="price-features">
                            <li><i className="fas fa-check"></i> Everything in Starter</li>
                            <li><i className="fas fa-check"></i> 50GB Storage</li>
                            <li><i className="fas fa-check"></i> AI Lead Scoring</li>
                            <li><i className="fas fa-check"></i> Sales Forecasting</li>
                            <li><i className="fas fa-check"></i> Advanced Analytics</li>
                            <li><i className="fas fa-check"></i> Priority Support</li>
                        </ul>
                        <button className="btn-price">Start Free Trial</button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="price-card">
                        <div className="price-name">Enterprise</div>
                        <div className="price-amount">$99</div>
                        <div className="price-period">per user / month</div>
                        <ul className="price-features">
                            <li><i className="fas fa-check"></i> Everything in Pro</li>
                            <li><i className="fas fa-check"></i> Unlimited Storage</li>
                            <li><i className="fas fa-check"></i> SSO & SAML</li>
                            <li><i className="fas fa-check"></i> Dedicated Success Manager</li>
                            <li><i className="fas fa-check"></i> Custom AI Models</li>
                            <li><i className="fas fa-check"></i> SLAs</li>
                        </ul>
                        <button className="btn-price">Contact Sales</button>
                    </div>
                </div>

                <section className="public-section" style={{ textAlign: 'center', marginTop: '80px' }}>
                    <h2>Frequently Asked Questions</h2>
                    <div style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'left', padding: '0 24px' }}>
                        {[
                            { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately.' },
                            { q: 'Is there a free trial for Pro?', a: 'Absolutely! You can try the Professional plan free for 14 days. No credit card required.' },
                            { q: 'Do you offer nonprofit discounts?', a: 'Yes, we offer a 50% discount for registered nonprofits and educational institutions.' }
                        ].map((faq, i) => (
                            <div key={i} style={{ marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'white' }}>{faq.q}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <PublicFooter />
        </div>
    );
}
