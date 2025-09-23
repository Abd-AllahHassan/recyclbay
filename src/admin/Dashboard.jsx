import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  Users,
  Heart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import apiService from '@/services/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await apiService.getStats();

      if (response.success) {
        setStats(response.data);
      } else {
        setError('فشل في تحميل بيانات لوحة التحكم');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('حدث خطأ أثناء تحميل بيانات لوحة التحكم');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>لوحة التحكم - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-1">نظرة عامة على أداء المنصة</p>
          </div>
          <Button
            onClick={fetchDashboardData}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 ml-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {stats && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.products?.total || 0}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats.products?.active || 0} نشط
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.orders?.total || 0}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats.orders?.totalRevenue || 0} درهم
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.users?.total || 0}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats.users?.active || 0} نشط
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">طلبات التبرع</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.donations?.total || 0}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats.donations?.pending || 0} في الانتظار
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-red-100">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                    <Package className="w-4 h-4 ml-2" />
                    إضافة منتج جديد
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    مراجعة الطلبات الجديدة
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="w-4 h-4 ml-2" />
                    مراجعة طلبات التبرع
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 ml-2" />
                    عرض التحليلات
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">التنبيهات</h3>
                <div className="space-y-4">
                  {stats.products?.lowStock > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">منتجات نفد مخزونها</p>
                        <p className="text-sm text-gray-600">
                          {stats.products.lowStock} منتج يحتاج إعادة تخزين
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.orders?.pending > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">طلبات في الانتظار</p>
                        <p className="text-sm text-gray-600">
                          {stats.orders.pending} طلب يحتاج معالجة
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.donations?.pending > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-red-100">
                        <Heart className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">طلبات تبرع جديدة</p>
                        <p className="text-sm text-gray-600">
                          {stats.donations.pending} طلب تبرع في الانتظار
                        </p>
                      </div>
                    </div>
                  )}

                  {(!stats.products?.lowStock && !stats.orders?.pending && !stats.donations?.pending) && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-green-100">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">كل شيء على ما يرام</p>
                        <p className="text-sm text-gray-600">
                          لا توجد تنبيهات حالياً
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">النشاط الحديث</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-blue-100">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">طلب جديد #1234</p>
                    <p className="text-sm text-gray-600">منذ 5 دقائق</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-green-100">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">تم تسليم طلب #1233</p>
                    <p className="text-sm text-gray-600">منذ 15 دقيقة</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">تم التسليم</Badge>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-red-100">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">طلب تبرع جديد</p>
                    <p className="text-sm text-gray-600">منذ ساعة</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">في الانتظار</Badge>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
