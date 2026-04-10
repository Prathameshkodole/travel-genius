import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CheesecakeLanding from './pages/CheesecakeLanding';
import CheesecakeDashboard from './pages/CheesecakeDashboard';
import CheesecakeSaved from './pages/CheesecakeSaved';
import CheesecakeSettings from './pages/CheesecakeSettings';
import Auth from './pages/Auth';
import ReportSettings from './pages/ReportSettings';
import BudgetMapAnalysis from './pages/BudgetMapAnalysis';
import AiInteractionLoading from './pages/AiInteractionLoading';
import SplashScreen from './pages/SplashScreen';
import StitchScreensGallery from './pages/StitchScreensGallery';
import StitchDesignSystem from './pages/StitchDesignSystem';
import { getSession } from './utils/auth';

function RequireAuth({ children }) {
  const session = getSession();
  return session?.token ? children : <Navigate to="/auth" replace />;
}

function RootEntry() {
  const session = getSession();
  return <Navigate to={session?.token ? '/home' : '/auth'} replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth-first entry */}
        <Route path="/" element={<RootEntry />} />
        <Route path="/auth" element={<Auth />} />

        {/* Stitch / Aithon UI */}
        <Route path="/home" element={<RequireAuth><Landing /></RequireAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/report-settings" element={<RequireAuth><ReportSettings /></RequireAuth>} />
        <Route path="/budget-map" element={<RequireAuth><BudgetMapAnalysis /></RequireAuth>} />
        <Route path="/ai-loading" element={<RequireAuth><AiInteractionLoading /></RequireAuth>} />
        <Route path="/splash" element={<RequireAuth><SplashScreen /></RequireAuth>} />

        {/* Legacy CheeseCake routes */}
        <Route path="/cheesecake" element={<CheesecakeLanding />} />
        <Route path="/cheesecake/dashboard" element={<CheesecakeDashboard />} />
        <Route path="/cheesecake/saved" element={<CheesecakeSaved />} />
        <Route path="/cheesecake/settings" element={<CheesecakeSettings />} />
        <Route path="/ethereal" element={<RequireAuth><Landing /></RequireAuth>} />
        <Route path="/ethereal/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

        {/* Stitch helpers */}
        <Route path="/stitch/screens" element={<StitchScreensGallery />} />
        <Route path="/stitch/design-system" element={<StitchDesignSystem />} />

        <Route path="*" element={<RootEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
