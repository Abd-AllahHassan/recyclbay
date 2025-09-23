import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import AboutUsPage from '@/pages/AboutUsPage';
import MissionPage from '@/pages/MissionPage';
import TeamPage from '@/pages/TeamPage';
import CareersPage from '@/pages/CareersPage';
import HelpCenterPage from '@/pages/HelpCenterPage';
import FaqPage from '@/pages/FaqPage';
import TransportPage from '@/pages/TransportPage';
import RenovationPage from '@/pages/RenovationPage';
import ReusePage from '@/pages/ReusePage';
import RentalPage from '@/pages/RentalPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import DonationsPage from '@/pages/DonationsPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AdminLogin from '@/admin/AdminLogin';
import AdminLayout from '@/admin/AdminLayout';
import Dashboard from '@/admin/Dashboard';
import ProductsManagement from '@/admin/ProductsManagement';
import OrdersManagement from '@/admin/OrdersManagement';
import DonationsManagement from '@/admin/DonationsManagement';
import UsersManagement from '@/admin/UsersManagement';
import Analytics from '@/admin/Analytics';
import ReportsPage from '@/admin/ReportsPage';
import useScrollToTop from '@/hooks/useScrollToTop';

function App() {
  useScrollToTop();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          {!isAdmin && <Header />}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/terms" element={<TermsAndConditionsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/renovation" element={<RenovationPage />} />
              <Route path="/reuse" element={<ReusePage />} />
              <Route path="/rental" element={<RentalPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/donations" element={<DonationsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsManagement />} />
                <Route path="orders" element={<OrdersManagement />} />
                <Route path="donations" element={<DonationsManagement />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<ReportsPage />} />
              </Route>
            </Routes>
          </main>
          {!isAdmin && <Footer />}
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
