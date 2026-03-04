/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import { RewardSystem } from './contexts/RewardSystem';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Profile from './pages/Profile';
import FinancialAnalysis from './pages/FinancialAnalysis';
import AddAccount from './pages/AddAccount';
import AddCard from './pages/AddCard';
import Planning from './pages/Planning';
import CompoundInterest from './pages/CompoundInterest';
import Investments from './pages/Investments';
import Security from './pages/Security';
import NewTransaction from './pages/NewTransaction';
import TransactionHistory from './pages/TransactionHistory';
import TransactionDetails from './pages/TransactionDetails';
import Goals from './pages/Goals';
import GoalDetails from './pages/GoalDetails';
import NewGoal from './pages/NewGoal';
import AddGoalValue from './pages/AddGoalValue';
import EditGoal from './pages/EditGoal';
import PersonalData from './pages/PersonalData';
import Onboarding from './pages/Onboarding';
import Consent from './pages/Consent';
import NewInvestment from './pages/NewInvestment';
import AssetDetails from './pages/AssetDetails';
import Budgets from './pages/Budgets';
import NewBudget from './pages/NewBudget';
import BudgetDetails from './pages/BudgetDetails';
import FinancialPerformance from './pages/FinancialPerformance';
import EditTransaction from './pages/EditTransaction';
import Shop from './pages/Shop';
import Ebooks from './pages/Ebooks';
import EbookDetails from './pages/EbookDetails';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Mentorships from './pages/Mentorships';
import MentorshipDetails from './pages/MentorshipDetails';
import EditBudget from './pages/EditBudget';
import Cart from './pages/Cart';
import Tools from './pages/Tools';
import Networking from './pages/Networking';
import Missions from './pages/Missions';
import ManageCategories from './pages/ManageCategories';
import NewCategory from './pages/NewCategory';
import NewSubCategory from './pages/NewSubCategory';
import EditCategory from './pages/EditCategory';
import EditSubCategory from './pages/EditSubCategory';
import FinancialTips from './pages/FinancialTips';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Upsell from './pages/Upsell';
import Downsell from './pages/Downsell';
import ProductDetails from './pages/ProductDetails';
import PhysicalBooks from './pages/PhysicalBooks';
import AllProducts from './pages/AllProducts';
import MyOrders from './pages/MyOrders';
import NotificationCenter from './pages/NotificationCenter';
import Admin from './pages/Admin';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/consent" element={<Consent />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Login />} />
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-account" element={<AddAccount />} />
                <Route path="/add-card" element={<AddCard />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/compound-interest" element={<CompoundInterest />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/security" element={<Security />} />
                <Route path="/new-transaction" element={<NewTransaction />} />
                <Route path="/transactions" element={<TransactionHistory />} />
                <Route path="/transaction-details" element={<TransactionDetails />} />
                <Route path="/edit-transaction" element={<EditTransaction />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/goal-details/:id" element={<GoalDetails />} />
                <Route path="/new-goal" element={<NewGoal />} />
                <Route path="/add-goal-value" element={<AddGoalValue />} />
                <Route path="/edit-goal" element={<EditGoal />} />
                <Route path="/personal-data" element={<PersonalData />} />
                <Route path="/financial-performance" element={<FinancialPerformance />} />
                <Route path="/new-investment" element={<NewInvestment />} />
                <Route path="/asset-details" element={<AssetDetails />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/new-budget" element={<NewBudget />} />
                <Route path="/budget-details" element={<BudgetDetails />} />
                <Route path="/edit-budget" element={<EditBudget />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/networking" element={<Networking />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product-details/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/upsell" element={<Upsell />} />
                <Route path="/downsell" element={<Downsell />} />
                <Route path="/physical-books" element={<PhysicalBooks />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/notifications" element={<NotificationCenter />} />
                <Route path="/ebooks" element={<Ebooks />} />
                <Route path="/ebook/:id" element={<ProductDetails />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<ProductDetails />} />
                <Route path="/mentorships" element={<Mentorships />} />
                <Route path="/mentorship/:id" element={<ProductDetails />} />
                <Route path="/categories" element={<ManageCategories />} />
                <Route path="/new-category" element={<NewCategory />} />
                <Route path="/new-subcategory" element={<NewSubCategory />} />
                <Route path="/edit-category" element={<EditCategory />} />
                <Route path="/edit-subcategory/:id" element={<EditSubCategory />} />
                <Route path="/financial-tips" element={<FinancialTips />} />
                <Route path="/financial-analysis" element={<FinancialAnalysis />} />
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </Router>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  );
}
