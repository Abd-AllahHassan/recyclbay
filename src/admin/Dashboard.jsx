import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Package,
  Users,
  ShoppingCart,
  Heart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  AlertTriangle,
  BarChart3,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'المستخدمين النشطين',
      value: '892',
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'إجمالي المبيعات',
      value: '45,678 درهم',
      change: '+23%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-emerald-600'
    },
    {
      title: 'طلبات التبرع',
      value: '23',
      change: '-5%',
      changeType: 'decrease',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'أحمد محمد', amount: '250 درهم', status: 'مكتمل', date: '2024-01-15' },
    { id: '#1235', customer: 'فاطمة علي', amount: '180 درهم', status: 'قيد المعالجة', date: '2024-01-15' },
    { id: '#1236', customer: 'محمد حسن', amount: '320 درهم', status: 'مكتمل', date: '2024-01-14' },
    { id: '#1237', customer: 'سارة أحمد', amount: '95 درهم', status: 'ملغي', date: '2024-01-14' },
  ];

  const lowStockProducts = [
    { name: 'هاتف ذكي مستعمل', stock: 2, category: 'إلكترونيات' },
    { name: 'كرسي مكتب', stock: 1, category: 'أثاث' },
    { name: 'دراجة هوائية', stock: 3, category: 'رياضة' },
  ];

  const mockUsers = [
    { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'مستخدم', status: 'نشط' },
    { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'مستخدم', status: 'نشط' },
    { id: 3, name: 'محمد حسن', email: 'mohamed@example.com', role: 'مدير', status: 'نشط' },
  ];

  const pendingDonations = [
    { id: 1, donor: 'سارة أحمد', item: 'ملابس مستعملة', status: 'قيد المراجعة' },
    { id: 2, donor: 'علي حسن', item: 'كتب مدرسية', status: 'قيد المراجعة' },
  ];

  const reports = [
    { title: 'المبيعات الشهرية', value: '45,678 درهم', change: '+15%' },
    { title: 'المنتجات المباعة', value: '892', change: '+8%' },
    { title: 'التبرعات المستلمة', value: '23', change: '-5%' },
  ];

  return (
    <>
      <Helmet>
        <title>لوحة التحكم - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">مرحباً بك في لوحة التحكم</h1>
          <p className="text-gray-600">إليك نظرة عامة على أداء المنصة اليوم</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 mr-2">من الأسبوع الماضي</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">الطلبات الأخيرة</h2>
              <ShoppingCart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'مكتمل'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'قيد المعالجة'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Low Stock Alert */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">تنبيهات المخزون المنخفض</h2>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="space-y-3">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      {product.stock} قطعة متبقية
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full mt-4 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                  عرض جميع المنتجات المنخفضة المخزون
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>المنتجات المنخفضة المخزون</DialogTitle>
                  <DialogDescription>
                    قائمة بجميع المنتجات التي تحتاج إلى إعادة تخزين
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">
                          {product.stock} قطعة متبقية
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">إضافة منتج جديد</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة منتج جديد</DialogTitle>
                  <DialogDescription>
                    أدخل تفاصيل المنتج الجديد
                  </DialogDescription>
                </DialogHeader>
                  <form className="space-y-6">
                    <div className="flex flex-col">
                      <label htmlFor="productName" className="mb-2 text-sm font-medium text-gray-700">اسم المنتج</label>
                      <input
                        id="productName"
                        name="productName"
                        type="text"
                        placeholder="أدخل اسم المنتج"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="category" className="mb-2 text-sm font-medium text-gray-700">الفئة</label>
                      <select
                        id="category"
                        name="category"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option>إلكترونيات</option>
                        <option>أثاث</option>
                        <option>رياضة</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="price" className="mb-2 text-sm font-medium text-gray-700">السعر</label>
                      <input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="أدخل السعر"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="quantity" className="mb-2 text-sm font-medium text-gray-700">الكمية</label>
                      <input
                        id="quantity"
                        name="quantity"
                        type="number"
                        placeholder="أدخل الكمية"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                      <Button variant="outline">إلغاء</Button>
                      <Button>إضافة المنتج</Button>
                    </div>
                  </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">إدارة المستخدمين</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>إدارة المستخدمين</DialogTitle>
                  <DialogDescription>
                    قائمة بجميع المستخدمين المسجلين في المنصة
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant={user.role === 'مدير' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant={user.status === 'نشط' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">مراجعة التبرعات</span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>مراجعة التبرعات</DialogTitle>
                  <DialogDescription>
                    قائمة بطلبات التبرع المعلقة للمراجعة
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {pendingDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donor}</p>
                        <p className="text-sm text-gray-500">{donation.item}</p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant="secondary">
                          {donation.status}
                        </Badge>
                        <Button size="sm" variant="outline">مراجعة</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Link
              to="/admin/reports"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center block"
            >
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">عرض التقارير</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
