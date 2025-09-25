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
import * as XLSX from 'xlsx';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statuses = [
    { value: 'all', label: 'جميع الطلبات' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'processing', label: 'قيد المعالجة' },
    { value: 'ready', label: 'جاهز للتسليم' },
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
      console.log('Fetching orders with params:', { page: currentPage, limit: 10, status: selectedStatus });

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      console.log('Making API call to getOrders...');
      const response = await apiService.getOrders(params);
      console.log('API Response:', response);

      if (response && response.success) {
        setOrders(response.data || []);
        setTotalPages(Math.ceil(response.pagination?.total / 10) || 1);
        console.log('Orders loaded successfully:', response.data?.length || 0);
      } else {
        console.error('API Error:', response);
        setError(`فشل في تحميل الطلبات: ${response?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(`حدث خطأ أثناء تحميل الطلبات: ${error.message}`);

      // Additional debugging information
      console.log('Error details:', {
        message: error.message,
        type: error.type,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus, redirectToWhatsApp = false) => {
    try {
      // Show loading state
      setLoading(true);
      console.log('Updating order status:', { orderId, newStatus, redirectToWhatsApp });

      const response = await apiService.updateOrder(orderId, { status: newStatus });
      console.log('Update order response:', response);

      if (response.success) {
        // Update local state
        const updatedOrders = orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);

        // Find the updated order for WhatsApp redirect
        const updatedOrder = updatedOrders.find(order => order._id === orderId);

        // Show success message
        setError(''); // Clear any existing errors

        // If confirming order and redirectToWhatsApp is true, redirect to WhatsApp
        if (newStatus === 'confirmed' && redirectToWhatsApp && updatedOrder?.customerInfo?.phone) {
          const phoneNumber = updatedOrder.customerInfo.phone.replace(/[^0-9]/g, '');
          const message = `مرحبا ${updatedOrder.customerInfo.name}، تم تأكيد طلبك رقم ${orderId.slice(-8)}. سنتواصل معك قريباً لترتيب التفاصيل. شكراً لك!`;
          const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

          // Open WhatsApp in new tab
          window.open(whatsappURL, '_blank');

          // Show success notification
          alert('تم تأكيد الطلب وإرسال رسالة WhatsApp للعميل');
        } else {
          // Show success message for other status updates
          const statusLabel = newStatus === 'cancelled' ? 'ملغي' : getStatusBadge(newStatus);
          alert(`تم تحديث حالة الطلب إلى: ${statusLabel}`);
        }

        // Refresh orders to get latest data
        fetchOrders();
      } else {
        console.error('Update order failed:', response);
        setError('فشل في تحديث حالة الطلب');
        alert('فشل في تحديث حالة الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      setError('حدث خطأ أثناء تحديث الطلب');
      alert('حدث خطأ أثناء تحديث الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    console.log('Cancel button clicked for order:', orderId);

    if (window.confirm('هل أنت متأكد من إلغاء هذا الطلب؟ لا يمكن التراجع عن هذا الإجراء.')) {
      console.log('User confirmed cancellation');
      try {
        await updateOrderStatus(orderId, 'cancelled');
        console.log('Order cancelled successfully');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('حدث خطأ أثناء إلغاء الطلب. يرجى المحاولة مرة أخرى.');
      }
    } else {
      console.log('User cancelled the cancellation');
    }
  };

  const handleConfirmOrder = async (orderId) => {
    if (window.confirm('هل تريد تأكيد هذا الطلب وإرسال رسالة WhatsApp للعميل؟')) {
      await updateOrderStatus(orderId, 'confirmed', true);
    }
  };

  const viewOrderDetails = async (orderId) => {
    try {
      const response = await apiService.getOrder(orderId);
      if (response.success) {
        setSelectedOrder(response.data);
        setShowDetailsModal(true);
      } else {
        setError('فشل في تحميل تفاصيل الطلب');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('حدث خطأ أثناء تحميل تفاصيل الطلب');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">مؤكد</Badge>;
      case 'processing':
        return <Badge className="bg-orange-100 text-orange-800">قيد المعالجة</Badge>;
      case 'ready':
        return <Badge className="bg-purple-100 text-purple-800">جاهز للتسليم</Badge>;
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
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'processing':
        return <Package className="w-4 h-4 text-orange-500" />;
      case 'ready':
        return <Package className="w-4 h-4 text-purple-500" />;
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
                         order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerInfo?.phone?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const exportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = filteredOrders.map(order => ({
        'رقم الطلب': order._id.slice(-8),
        'اسم العميل': order.customerInfo?.name || 'غير محدد',
        'البريد الإلكتروني': order.customerInfo?.email || 'غير محدد',
        'رقم الهاتف': order.customerInfo?.phone || 'غير محدد',
        'المبلغ الإجمالي': `${order.totalPrice} درهم`,
        'الحالة': getStatusBadge(order.status).props.children,
        'تاريخ الإنشاء': new Date(order.createdAt).toLocaleDateString('ar-SA'),
        'وقت الإنشاء': new Date(order.createdAt).toLocaleTimeString('ar-SA'),
        'ملاحظات الطلب': order.orderNotes || 'لا توجد ملاحظات',
        'المنتجات': order.products?.map(p => `${p.name} (${p.quantity} × ${p.price} درهم)`).join(' | ') || 'لا توجد منتجات',
        'عنوان الشحن': order.customerInfo?.address ?
          `${order.customerInfo.address.street}, ${order.customerInfo.address.city}, ${order.customerInfo.address.state}` :
          'لا يوجد عنوان'
      }));

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Set column widths
      const colWidths = [
        { wch: 12 }, // رقم الطلب
        { wch: 20 }, // اسم العميل
        { wch: 25 }, // البريد الإلكتروني
        { wch: 15 }, // رقم الهاتف
        { wch: 15 }, // المبلغ الإجمالي
        { wch: 12 }, // الحالة
        { wch: 12 }, // تاريخ الإنشاء
        { wch: 12 }, // وقت الإنشاء
        { wch: 30 }, // ملاحظات الطلب
        { wch: 50 }, // المنتجات
        { wch: 40 }  // عنوان الشحن
      ];
      ws['!cols'] = colWidths;

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, 'الطلبات');

      // Generate filename with current date
      const currentDate = new Date().toLocaleDateString('ar-SA').replace(/\//g, '-');
      const filename = `طلبات_ريسايكل_باي_${currentDate}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);

      // Show success message
      alert(`تم تصدير ${filteredOrders.length} طلب بنجاح إلى ملف Excel`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('حدث خطأ أثناء تصدير البيانات. يرجى المحاولة مرة أخرى.');
    }
  };

  // Add error boundary fallback
  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-600 ml-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">حدث خطأ</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <Button
                onClick={fetchOrders}
                className="mt-3 bg-red-600 hover:bg-red-700"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                إعادة المحاولة
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="mr-3 text-gray-600">جاري تحميل الطلبات...</span>
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
            <Button
              variant="outline"
              size="sm"
              onClick={exportToExcel}
              disabled={filteredOrders.length === 0}
            >
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
                        {order.customerInfo?.name || 'غير محدد'}
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
                            <span className="font-medium">{item.name || 'منتج غير محدد'}</span>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Badge variant="outline">الكمية: {item.quantity}</Badge>
                              <span className="text-sm text-gray-500">{item.price} درهم</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.customerInfo?.address && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">عنوان الشحن:</h4>
                        <p className="text-sm text-gray-600">
                          {order.customerInfo.address.street}, {order.customerInfo.address.city}, {order.customerInfo.address.state}, {order.customerInfo.address.zipCode}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewOrderDetails(order._id)}
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    التفاصيل
                  </Button>

                  {order.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleConfirmOrder(order._id)}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 ml-2" />
                        تأكيد الطلب
                      </Button>

                      <Button
                        onClick={() => handleCancelOrder(order._id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 ml-2" />
                        إلغاء
                      </Button>
                    </>
                  )}

                  {order.status === 'confirmed' && (
                    <Button
                      onClick={() => updateOrderStatus(order._id, 'processing')}
                      className="bg-orange-600 hover:bg-orange-700"
                      size="sm"
                    >
                      <Package className="w-4 h-4 ml-2" />
                      بدء المعالجة
                    </Button>
                  )}

                  {order.status === 'processing' && (
                    <Button
                      onClick={() => updateOrderStatus(order._id, 'ready')}
                      className="bg-purple-600 hover:bg-purple-700"
                      size="sm"
                    >
                      <Package className="w-4 h-4 ml-2" />
                      جاهز للتسليم
                    </Button>
                  )}

                  {order.status === 'ready' && (
                    <Button
                      onClick={() => updateOrderStatus(order._id, 'delivered')}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <CheckCircle className="w-4 h-4 ml-2" />
                      تم التسليم
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

        {/* Order Details Modal */}
        {showDetailsModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    تفاصيل الطلب #{selectedOrder._id.slice(-8)}
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetailsModal(false)}
                  >
                    <XCircle className="w-4 h-4 ml-2" />
                    إغلاق
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">معلومات العميل</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">الاسم:</span>
                        <span className="mr-2">{selectedOrder.customerInfo?.name || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">البريد الإلكتروني:</span>
                        <span className="mr-2">{selectedOrder.customerInfo?.email || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">الهاتف:</span>
                        <span className="mr-2">{selectedOrder.customerInfo?.phone || 'غير محدد'}</span>
                      </div>
                      {selectedOrder.customerInfo?.address && (
                        <div>
                          <span className="font-medium text-gray-700">العنوان:</span>
                          <div className="mr-2 mt-1">
                            <p>{selectedOrder.customerInfo.address.street}</p>
                            <p>{selectedOrder.customerInfo.address.city}, {selectedOrder.customerInfo.address.state} {selectedOrder.customerInfo.address.zipCode}</p>
                            <p>{selectedOrder.customerInfo.address.country}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">معلومات الطلب</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">الحالة:</span>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">المبلغ الإجمالي:</span>
                        <span className="mr-2">{selectedOrder.totalPrice} درهم</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">تاريخ الإنشاء:</span>
                        <span className="mr-2">{new Date(selectedOrder.createdAt).toLocaleString('ar-SA')}</span>
                      </div>
                      {selectedOrder.orderNotes && (
                        <div>
                          <span className="font-medium text-gray-700">ملاحظات الطلب:</span>
                          <p className="mr-2 mt-1 bg-white p-2 rounded border">{selectedOrder.orderNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">المنتجات</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      {selectedOrder.products?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div>
                            <span className="font-medium">{item.name || 'منتج غير محدد'}</span>
                            <div className="text-sm text-gray-600">
                              <span>الكمية: {item.quantity}</span>
                              <span className="mx-2">•</span>
                              <span>السعر: {item.price} درهم</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <span className="font-medium">{item.price * item.quantity} درهم</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-3 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">المجموع الكلي:</span>
                        <span className="font-bold text-lg">{selectedOrder.totalPrice} درهم</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status History */}
                {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">تاريخ تغيير الحالة</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {selectedOrder.statusHistory.map((history, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div className="flex items-center">
                              {getStatusIcon(history.status)}
                              <span className="mr-2 font-medium">{getStatusBadge(history.status)}</span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span>{new Date(history.timestamp).toLocaleString('ar-SA')}</span>
                              {history.changedBy && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>تم التغيير بواسطة: {history.changedBy}</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* WhatsApp Message */}
                {selectedOrder.whatsappMessage && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">رسالة WhatsApp</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm bg-white p-3 rounded border">
                        {selectedOrder.whatsappMessage}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersManagement;
