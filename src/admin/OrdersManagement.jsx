import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import apiService from '@/services/apiService';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const statuses = [
    { value: 'all', label: 'جميع الطلبات' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'processing', label: 'قيد المعالجة' },
    { value: 'shipped', label: 'تم الشحن' },
    { value: 'delivered', label: 'تم التسليم' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  useEffect(() => {
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      const response = await apiService.getOrders(params);

      if (response.success) {
        setOrders(response.data);
        setTotalPages(Math.ceil(response.pagination?.total / 10) || 1);
      } else {
        setError('فشل في تحميل الطلبات');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('حدث خطأ أثناء تحميل الطلبات');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await apiService.updateOrder(orderId, { status: newStatus });

      if (response.success) {
        // Update local state
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        setError('فشل في تحديث حالة الطلب');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setError('حدث خطأ أثناء تحديث الطلب');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">قيد المعالجة</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800">تم الشحن</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">تم التسليم</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">ملغي</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <ShoppingCart className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
        <title>إدارة الطلبات - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h1>
            <p className="text-gray-600 mt-1">مراقبة وإدارة جميع طلبات العملاء</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              onClick={fetchOrders}
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

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="البحث في الطلبات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        طلب #{order._id.slice(-8)}
                      </h3>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <span className="font-medium ml-2">العميل:</span>
                        {order.user?.name || 'غير محدد'}
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium ml-2">المبلغ:</span>
                        {order.totalPrice} درهم
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium ml-2">التاريخ:</span>
                        {new Date(order.createdAt).toLocaleDateString('ar-SA')}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">المنتجات:</h4>
                      <div className="space-y-2">
                        {order.products?.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <span className="font-medium">{item.product?.name || 'منتج غير محدد'}</span>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Badge variant="outline">الكمية: {item.quantity}</Badge>
                              <span className="text-sm text-gray-500">{item.price} درهم</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.shippingAddress && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">عنوان الشحن:</h4>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 ml-2" />
                    التفاصيل
                  </Button>

                  {order.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => updateOrderStatus(order._id, 'processing')}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <Package className="w-4 h-4 ml-2" />
                        بدء المعالجة
                      </Button>

                      <Button
                        onClick={() => updateOrderStatus(order._id, 'cancelled')}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 ml-2" />
                        إلغاء
                      </Button>
                    </>
                  )}

                  {order.status === 'processing' && (
                    <Button
                      onClick={() => updateOrderStatus(order._id, 'shipped')}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Truck className="w-4 h-4 ml-2" />
                      شحن
                    </Button>
                  )}

                  {order.status === 'shipped' && (
                    <Button
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 ml-2" />
                      تسليم
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
            <p className="text-gray-500">لم يتم العثور على طلبات تطابق معايير البحث</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 ml-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-700">
              عرض <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> إلى{' '}
              <span className="font-medium">{Math.min(currentPage * 10, orders.length)}</span> من أصل{' '}
              <span className="font-medium">{orders.length}</span> نتيجة
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={currentPage === 1 ? 'bg-emerald-50 text-emerald-700' : ''}
              >
                {currentPage}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                التالي
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersManagement;
