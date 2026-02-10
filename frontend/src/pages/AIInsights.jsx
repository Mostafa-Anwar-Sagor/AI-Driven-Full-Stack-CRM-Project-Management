import '../styles/AIInsights.css';

export default function AIInsights() {
    const models = [
        {
            name: 'Lead Scoring Engine',
            algo: 'Random Forest Classifier',
            icon: 'fa-crosshairs',
            color: '#6366f1',
            accuracy: 87,
            precision: 89,
            recall: 85,
            f1: 87,
            description: 'Predicts lead conversion probability using 50+ behavioral features including engagement patterns, company demographics, and historical interaction data.',
            features: ['Engagement Score', 'Company Size', 'Industry Match', 'Response Time', 'Content Interactions'],
            status: 'active',
            lastTrained: '2 hours ago',
            dataPoints: '125K',
        },
        {
            name: 'Sales Forecasting',
            algo: 'LSTM Neural Network',
            icon: 'fa-chart-line',
            color: '#8b5cf6',
            accuracy: 91,
            precision: 92,
            recall: 90,
            f1: 91,
            description: 'Time-series sales prediction using Long Short-Term Memory networks trained on historical revenue data, seasonal patterns, and market indicators.',
            features: ['Historical Revenue', 'Seasonality', 'Pipeline Data', 'Market Trends', 'Economic Indicators'],
            status: 'active',
            lastTrained: '6 hours ago',
            dataPoints: '89K',
        },
        {
            name: 'Churn Prediction',
            algo: 'XGBoost Classifier',
            icon: 'fa-user-minus',
            color: '#ec4899',
            accuracy: 84,
            precision: 86,
            recall: 82,
            f1: 84,
            description: 'Identifies customers at risk of churning by analyzing usage patterns, support ticket history, payment behavior, and engagement metrics.',
            features: ['Usage Frequency', 'Support Tickets', 'Payment History', 'Feature Adoption', 'NPS Score'],
            status: 'active',
            lastTrained: '1 day ago',
            dataPoints: '67K',
        },
        {
            name: 'Sentiment Analysis',
            algo: 'Fine-tuned BERT',
            icon: 'fa-brain',
            color: '#14b8a6',
            accuracy: 89,
            precision: 91,
            recall: 87,
            f1: 89,
            description: 'NLP-powered sentiment classification on customer feedback, support conversations, and social media mentions using transformer-based architecture.',
            features: ['Customer Reviews', 'Support Chats', 'Email Sentiment', 'Social Mentions', 'Survey Responses'],
            status: 'active',
            lastTrained: '4 hours ago',
            dataPoints: '234K',
        },
        {
            name: 'Smart Task Assignment',
            algo: 'Reinforcement Learning (MAB)',
            icon: 'fa-robot',
            color: '#f59e0b',
            accuracy: 76,
            precision: 78,
            recall: 74,
            f1: 76,
            description: 'Optimizes task allocation across team members using Multi-Armed Bandit approach, balancing workload, expertise matching, and deadline proximity.',
            features: ['Skill Matrix', 'Workload Balance', 'Deadline Priority', 'Historical Performance', 'Availability'],
            status: 'training',
            lastTrained: '12 hours ago',
            dataPoints: '45K',
        },
        {
            name: 'Document Classifier',
            algo: 'TF-IDF + SVM',
            icon: 'fa-file-alt',
            color: '#10b981',
            accuracy: 82,
            precision: 84,
            recall: 80,
            f1: 82,
            description: 'Automatically categorizes incoming documents, emails, and attachments into predefined project categories and priority levels.',
            features: ['Text Content', 'Metadata', 'File Type', 'Sender Info', 'Keywords'],
            status: 'active',
            lastTrained: '3 days ago',
            dataPoints: '18K',
        },
    ];

    return (
        <div className="ai-page">
            <div className="page-header">
                <div>
                    <h1><i className="fas fa-brain"></i> AI Insights</h1>
                    <p className="subtitle">Machine Learning powered business intelligence — 6 Active Models</p>
                </div>
                <div className="header-actions">
                    <div className="ai-status-badge"><span className="pulse-dot"></span> All Systems Operational</div>
                </div>
            </div>

            <div className="ai-overview-stats">
                {[
                    { label: 'Total Predictions', value: '1.2M', icon: 'fa-bolt', color: '#6366f1' },
                    { label: 'Avg Accuracy', value: '84.8%', icon: 'fa-bullseye', color: '#10b981' },
                    { label: 'Models Active', value: '5/6', icon: 'fa-microchip', color: '#8b5cf6' },
                    { label: 'Data Points', value: '578K', icon: 'fa-database', color: '#f59e0b' },
                ].map((s, i) => (
                    <div key={i} className="ai-overview-stat" style={{ '--accent': s.color }}>
                        <i className={`fas ${s.icon}`}></i>
                        <span className="ai-stat-value">{s.value}</span>
                        <span className="ai-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>

            <div className="ai-models-grid">
                {models.map((m, i) => (
                    <div key={i} className="ai-model-card" style={{ '--model-color': m.color }}>
                        <div className="model-header">
                            <div className="model-icon" style={{ background: `${m.color}20`, color: m.color }}>
                                <i className={`fas ${m.icon}`}></i>
                            </div>
                            <span className={`model-status ${m.status}`}>{m.status === 'active' ? '● Active' : '◌ Training'}</span>
                        </div>
                        <h3>{m.name}</h3>
                        <span className="model-algo">{m.algo}</span>
                        <p className="model-desc">{m.description}</p>

                        <div className="model-metrics">
                            {[
                                { label: 'Accuracy', value: m.accuracy },
                                { label: 'Precision', value: m.precision },
                                { label: 'Recall', value: m.recall },
                                { label: 'F1 Score', value: m.f1 },
                            ].map((metric, mi) => (
                                <div key={mi} className="metric">
                                    <div className="metric-header">
                                        <span>{metric.label}</span>
                                        <span style={{ color: m.color }}>{metric.value}%</span>
                                    </div>
                                    <div className="metric-bar">
                                        <div className="metric-fill" style={{ width: `${metric.value}%`, background: m.color }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="model-features">
                            <h4>Key Features</h4>
                            <div className="features-list">
                                {m.features.map((f, fi) => <span key={fi} className="feature-tag">{f}</span>)}
                            </div>
                        </div>

                        <div className="model-footer">
                            <span><i className="fas fa-clock"></i> {m.lastTrained}</span>
                            <span><i className="fas fa-database"></i> {m.dataPoints} samples</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
