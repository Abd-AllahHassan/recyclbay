import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  Heart,
  Activity,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import apiService from '@/services/apiService';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await apiService.getStats();

      if (response.success) {
        setStats(response.data);
      } else {
        setError('فشل في تحميل الإحصائيات');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('حدث خطأ أثناء تحميل الإحصائيات');
    } finally {
      setLoading(false);
    }
  };

  const timeRanges = [
    { value: '7', label: 'آخر 7 أيام' },
    { value: '30', label: 'آخر 30 يوم' },
    { value: '90', label: 'آخر 3 أشهر' },
    { value: '365', label: 'آخر سنة' }
  ];

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
        <title>التحليلات - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">التحليلات والإحصائيات</h1>
            <p className="text-gray-600 mt-1">نظرة شاملة على أداء المنصة</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <Button
              onClick={fetchStats}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 text-red-600 ml-3" />
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
                    <p className="text-sm font-medium text-gray-600">معدل التحويل</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.orders?.total && stats.users?.total
                        ? ((stats.orders.total / stats.users.total) * 100).toFixed(1)
                        : 0}%
                    </p>
                    <div className="flex items-center mt-2">
                      <Activity className="w-4 h-4 text-blue-500 ml-1" />
                      <span className="text-sm font-medium text-blue-600">
                        من المستخدمين
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100">
                    <BarChart3 className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Status Distribution */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع حالة الطلبات</h3>
                <div className="space-y-4">
                  {stats.orders && Object.entries(stats.orders).map(([key, value]) => {
                    if (key === 'total' || key === 'totalRevenue') return null;

                    const statusLabels = {
                      pending: 'في الانتظار',
                      processing: 'قيد المعالجة',
                      shipped: 'تم الشحن',
                      delivered: 'تم التسليم',
                      cancelled: 'ملغي'
                    };

                    const statusColors = {
                      pending: 'bg-yellow-100 text-yellow-800',
                      processing: 'bg-blue-100 text-blue-800',
                      shipped: 'bg-purple-100 text-purple-800',
                      delivered: 'bg-green-100 text-green-800',
                      cancelled: 'bg-red-100 text-red-800'
                    };

                    return (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Badge className={statusColors[key] || 'bg-gray-100 text-gray-800'}>
                            {statusLabels[key] || key}
                          </Badge>
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-gray-900">{value}</span>
                          <span className="text-sm text-gray-500 mr-2">طلب</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Product Status Distribution */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع حالة المنتجات</h3>
                <div className="space-y-4">
                  {stats.products && Object.entries(stats.products).map(([key, value]) => {
                    if (key === 'total') return null;

                    const statusLabels = {
                      active: 'نشط',
                      inactive: 'غير نشط'
                    };

                    const statusColors = {
                      active: 'bg-green-100 text-green-800',
                      inactive: 'bg-gray-100 text-gray-800'
                    };

                    return (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Badge className={statusColors[key] || 'bg-gray-100 text-gray-800'}>
                            {statusLabels[key] || key}
                          </Badge>
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-gray-900">{value}</span>
                          <span className="text-sm text-gray-500 mr-2">منتج</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Performance Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">رؤى الأداء</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {stats.orders?.totalRevenue ? (stats.orders.totalRevenue / 1000).toFixed(1) : 0}K
                  </div>
                  <p className="text-sm text-gray-600">متوسط الإيرادات اليومية</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {stats.orders?.total && stats.products?.total
                      ? (stats.orders.total / stats.products.total).toFixed(1)
                      : 0}
                  </div>
                  <p className="text-sm text-gray-600">متوسط الطلبات لكل منتج</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {stats.users?.total && stats.orders?.total
                      ? ((stats.orders.total / stats.users.total) * 100).toFixed(1)
                      : 0}%
                  </div>
                  <p className="text-sm text-gray-600">معدل التحويل</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </>
  );
};

export default Analytics;
