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
import Notifications from './pages/Notifications';
import NewTransaction from './pages/NewTransaction';
import TransactionHistory from './pages/TransactionHistory';
import TransactionDetails from './pages/TransactionDetails';
import Goals from './pages/Goals';
import AddGoalValue from './pages/AddGoalValue';
import EditGoal from './pages/EditGoal';
import Categories from './pages/Categories';
import EditCategory from './pages/EditCategory';
import ManageCategories from './pages/ManageCategories';
import ManageSubCategories from './pages/ManageSubCategories';
import EditSubCategory from './pages/EditSubCategory';
import NewCategory from './pages/NewCategory';
import NewSubCategory from './pages/NewSubCategory';

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
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/new-transaction" element={<NewTransaction />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/transaction-details" element={<TransactionDetails />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/add-goal-value" element={<AddGoalValue />} />
            <Route path="/edit-goal" element={<EditGoal />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/edit-category" element={<EditCategory />} />
            <Route path="/manage-categories" element={<ManageCategories />} />
            <Route path="/manage-subcategories" element={<ManageSubCategories />} />
            <Route path="/edit-subcategory" element={<EditSubCategory />} />
            <Route path="/new-category" element={<NewCategory />} />
            <Route path="/new-subcategory" element={<NewSubCategory />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
