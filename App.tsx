
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Admission from './pages/Admission';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import VidyaChat from './components/VidyaChat';
import SplashScreen from './components/SplashScreen';
import DeveloperWatermark from './components/DeveloperWatermark';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initial loading delay for institutional branding and assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-zinc-50 selection:bg-sky-100 selection:text-sky-900">
        <Routes>
          {/* Default entry point: Home/Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Institutional Information */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Institutional Access Points */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} 
          />

          {/* Tertiary Information Routes */}
          <Route path="/admission" element={<Admission />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* Secured Campus Dashboard */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Institutional AI Assistant */}
        <VidyaChat />

        {/* Developer Watermark */}
        <DeveloperWatermark />
      </div>
    </Router>
  );
};

export default App;

