import { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { projectsAPI } from '../services/api';
import '../styles/Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend, Filler);

export default function Analytics() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        projectsAPI.list().then(res => setProjects(res.data || [])).catch(() => { });
    }, []);

    const chartOpts = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8', font: { family: 'Inter' } } } },
        scales: {
            x: { grid: { color: 'rgba(99,102,241,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter' } } },
            y: { grid: { color: 'rgba(99,102,241,0.06)' }, ticks: { color: '#64748b', font: { family: 'Inter' } } },
        },
    };

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div><h1>Analytics</h1><p className="subtitle">Performance metrics and insights</p></div>
            </div>

            <div className="analytics-stats">
                {[
                    { label: 'Avg Velocity', value: '24.5', unit: 'pts/sprint', icon: 'fa-tachometer-alt', color: '#6366f1' },
                    { label: 'Completion Rate', value: '87%', unit: 'this month', icon: 'fa-check-circle', color: '#10b981' },
                    { label: 'Lead Time', value: '3.2', unit: 'days avg', icon: 'fa-clock', color: '#f59e0b' },
                    { label: 'Bug Resolution', value: '1.8', unit: 'days avg', icon: 'fa-bug', color: '#ef4444' },
                ].map((s, i) => (
                    <div key={i} className="analytics-stat" style={{ '--accent': s.color }}>
                        <div className="analytics-stat-icon"><i className={`fas ${s.icon}`}></i></div>
                        <div><span className="analytics-stat-value">{s.value}</span><span className="analytics-stat-label">{s.label}</span><span className="analytics-stat-unit">{s.unit}</span></div>
                    </div>
                ))}
            </div>

            <div className="charts-grid">
                <div className="chart-card full">
                    <h3><i className="fas fa-chart-line"></i> Activity Trend (Last 30 Days)</h3>
                    <div className="chart-wrapper large">
                        <Line data={{
                            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
                            datasets: [
                                { label: 'Tasks Completed', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5), borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.1)', fill: true, tension: 0.4, borderWidth: 2, pointRadius: 0, pointHoverRadius: 4 },
                                { label: 'Issues Resolved', data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 2), borderColor: '#10b981', backgroundColor: 'transparent', tension: 0.4, borderWidth: 2, pointRadius: 0, borderDash: [5, 5] },
                            ]
                        }} options={{ ...chartOpts, plugins: { ...chartOpts.plugins, legend: { position: 'top', align: 'end', labels: { ...chartOpts.plugins.legend.labels, usePointStyle: true } } } }} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3><i className="fas fa-chart-pie"></i> Task Distribution</h3>
                    <div className="chart-wrapper">
                        <Doughnut data={{
                            labels: ['Completed', 'In Progress', 'New', 'Blocked'],
                            datasets: [{ data: [42, 28, 22, 8], backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444'], borderWidth: 0, borderRadius: 4 }]
                        }} options={{ responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16, usePointStyle: true, font: { family: 'Inter' } } } } }} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3><i className="fas fa-chart-bar"></i> Sprint Velocity</h3>
                    <div className="chart-wrapper">
                        <Bar data={{
                            labels: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5', 'Sprint 6'],
                            datasets: [
                                { label: 'Planned', data: [24, 30, 28, 35, 32, 38], backgroundColor: 'rgba(99,102,241,0.3)', borderColor: '#6366f1', borderWidth: 1, borderRadius: 6 },
                                { label: 'Completed', data: [22, 28, 30, 33, 35, 36], backgroundColor: 'rgba(16,185,129,0.3)', borderColor: '#10b981', borderWidth: 1, borderRadius: 6 },
                            ]
                        }} options={chartOpts} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3><i className="fas fa-fire"></i> Burndown Chart</h3>
                    <div className="chart-wrapper">
                        <Line data={{
                            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
                            datasets: [
                                { label: 'Ideal', data: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10], borderColor: '#64748b', borderDash: [5, 5], borderWidth: 1, pointRadius: 0, tension: 0 },
                                { label: 'Actual', data: [100, 95, 88, 75, 68, 55, 42, 38, 25, 12], borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,0.1)', fill: true, borderWidth: 2, tension: 0.3, pointRadius: 3, pointBackgroundColor: '#8b5cf6' },
                            ]
                        }} options={chartOpts} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3><i className="fas fa-users"></i> Team Performance</h3>
                    <div className="chart-wrapper">
                        <Bar data={{
                            labels: ['Admin', 'Dev 1', 'Dev 2', 'Designer', 'QA'],
                            datasets: [{ label: 'Tasks Completed', data: [32, 28, 24, 18, 22], backgroundColor: ['rgba(99,102,241,0.6)', 'rgba(139,92,246,0.6)', 'rgba(236,72,153,0.6)', 'rgba(20,184,166,0.6)', 'rgba(245,158,11,0.6)'], borderRadius: 8, borderWidth: 0 }]
                        }} options={{ ...chartOpts, indexAxis: 'y', plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="chart-card">
                    <h3><i className="fas fa-flag"></i> Issue Priority Distribution</h3>
                    <div className="chart-wrapper">
                        <Doughnut data={{
                            labels: ['Critical', 'High', 'Normal', 'Low', 'Wishlist'],
                            datasets: [{ data: [5, 12, 25, 15, 8], backgroundColor: ['#ef4444', '#f59e0b', '#6366f1', '#14b8a6', '#64748b'], borderWidth: 0 }]
                        }} options={{ responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { position: 'right', labels: { color: '#94a3b8', padding: 12, usePointStyle: true, font: { family: 'Inter', size: 11 } } } } }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
