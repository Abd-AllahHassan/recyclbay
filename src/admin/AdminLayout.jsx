import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Heart,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  User,
  CheckCircle,
  AlertTriangle,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'طلب جديد',
      message: 'تم استلام طلب جديد من أحمد محمد',
      time: 'منذ 5 دقائق',
      read: false,
      icon: ShoppingCart
    },
    {
      id: 2,
      type: 'donation',
      title: 'طلب تبرع',
      message: 'طلب تبرع جديد من فاطمة علي',
      time: 'منذ 15 دقيقة',
      read: false,
      icon: Heart
    },
    {
      id: 3,
      type: 'low_stock',
      title: 'مخزون منخفض',
      message: 'المنتج "هاتف ذكي سامسونج" أوشك على النفاد',
      time: 'منذ ساعة',
      read: true,
      icon: AlertTriangle
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
    { name: 'إدارة المنتجات', href: '/admin/products', icon: Package },
    { name: 'إدارة الطلبات', href: '/admin/orders', icon: ShoppingCart },
    { name: 'التحليلات', href: '/admin/analytics', icon: BarChart3 },
    { name: 'إدارة التبرعات', href: '/admin/donations', icon: Heart },
    { name: 'إدارة المستخدمين', href: '/admin/users', icon: Users },
    { name: 'التقارير', href: '/admin/reports', icon: BarChart3 },
    { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:fixed lg:inset-y-0 lg:right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col overflow-hidden`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0 sticky top-0 bg-white z-10">
          <h1 className="text-xl font-bold text-emerald-600">RecycleBay Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4 flex-grow overflow-y-auto overscroll-contain">
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.li
                  key={item.name}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5 ml-3" />
                    {item.name}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-white">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <motion.div
              className="flex items-center space-x-2 space-x-reverse w-full lg:w-auto justify-center lg:justify-end"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {/* Search */}
              <motion.div 
                className="relative flex-shrink-0"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
                <div className="hidden sm:block relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="البحث..."
                    className="w-48 sm:w-64 pr-10"
                  />
                </div>
              </motion.div>

              {/* Notifications */}
              <motion.div
                ref={notificationsRef}
                className="relative"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">الإشعارات</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3 space-x-reverse">
                            <div className={`p-2 rounded-full ${
                              notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                              notification.type === 'donation' ? 'bg-red-100 text-red-600' :
                              'bg-yellow-100 text-yellow-600'
                            }`}>
                              <notification.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <Button variant="outline" className="w-full text-sm">
                        عرض جميع الإشعارات
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* User menu */}
              <motion.div 
                className="flex items-center space-x-2 space-x-reverse"
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-white" />
                </motion.div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">المدير</span>
              </motion.div>
            </motion.div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
