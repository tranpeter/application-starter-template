import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// Layouts
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import InventoryDetail from './pages/InventoryDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Context
import { AuthProvider } from './context/AuthContext';

// Styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <Router>
        <AuthProvider>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            
            {/* App routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/:id" element={<InventoryDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
