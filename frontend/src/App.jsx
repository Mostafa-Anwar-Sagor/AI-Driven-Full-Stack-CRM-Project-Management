import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Backlog from './pages/Backlog';
import Kanban from './pages/Kanban';
import Sprints from './pages/Sprints';
import Tasks from './pages/Tasks';
import Issues from './pages/Issues';
import Epics from './pages/Epics';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';
import Wiki from './pages/Wiki';
import Settings from './pages/Settings';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="app-loader"><div className="loader-spinner"></div><p>Loading...</p></div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Redirects to dashboard if already logged in (for Login/Register pages)
function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="app-loader"><div className="loader-spinner"></div><p>Loading...</p></div>;
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Marketing Pages (Visible to all) */}
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Auth Pages (Redirect to Dashboard if logged in) */}
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/backlog" element={<Backlog />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/sprints" element={<Sprints />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/epics" element={<Epics />} />
            <Route path="/team" element={<Team />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/wiki" element={<Wiki />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
