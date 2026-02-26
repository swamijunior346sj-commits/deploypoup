/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Missions from './pages/Missions';
import Analysis from './pages/Analysis';
import Profile from './pages/Profile';
import Ranking from './pages/Ranking';
import Reports from './pages/Reports';
import AddAccount from './pages/AddAccount';
import AddCard from './pages/AddCard';
import Planning from './pages/Planning';
import CompoundInterest from './pages/CompoundInterest';
import Investments from './pages/Investments';
import AIAssistant from './pages/AIAssistant';
import Security from './pages/Security';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/add-account" element={<AddAccount />} />
            <Route path="/add-card" element={<AddCard />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/compound-interest" element={<CompoundInterest />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/security" element={<Security />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
