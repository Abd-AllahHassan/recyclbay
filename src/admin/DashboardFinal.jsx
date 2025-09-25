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
  RefreshCw,
  Plus,
  Eye,
  X,
  Edit,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiService from '@/services/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Popup states
  const [activePopup, setActivePopup] = useState(null);
  const [popupData, setPopupData] = useState({
    recentOrders: [],
    pendingDonations: [],
    analytics: null,
    newProduct: {
      name: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      condition: '',
      brand: '',
      status: 'active',
      images: [],
      imageFiles: [] // Store actual files for upload
    }
  });
  const [popupLoading, setPopupLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await apiService.getStats();

      if (response.success) {
        setStats(response.data.stats);
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

  // Fetch data for popups
  const fetchRecentOrders = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getOrders({ limit: 5, status: 'pending' });
      if (response.success) {
        setPopupData(prev => ({ ...prev, recentOrders: response.data }));
      }
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchPendingDonations = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getDonations({ status: 'pending' });
      if (response.success) {
        setPopupData(prev => ({ ...prev, pendingDonations: response.data }));
      }
    } catch (error) {
      console.error('Error fetching pending donations:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getStats();
      if (response.success) {
        setPopupData(prev => ({ ...prev, analytics: response.data.stats }));
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));

    setPopupData(prev => ({
      ...prev,
      newProduct: {
        ...prev.newProduct,
        images: imageUrls,
        imageFiles: files
      }
    }));
  };

  const removeImage = (index) => {
    setPopupData(prev => ({
      ...prev,
      newProduct: {
        ...prev.newProduct,
        images: prev.newProduct.images.filter((_, i) => i !== index),
        imageFiles: prev.newProduct.imageFiles.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCreateProduct = async () => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'price', 'category', 'quantity', 'condition'];
      const missingFields = requiredFields.filter(field => !popupData.newProduct[field]);

      if (missingFields.length > 0) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      setUploadingImages(true);

      // Use createProductWithImages if there are image files, otherwise use createProduct
      const response = popupData.newProduct.imageFiles.length > 0
        ? await apiService.createProductWithImages(popupData.newProduct, popupData.newProduct.imageFiles)
        : await apiService.createProduct(popupData.newProduct);

      if (response.success) {
        alert('تم إضافة المنتج بنجاح');
        setActivePopup(null);
        setPopupData(prev => ({
          ...prev,
          newProduct: {
            name: '',
            description: '',
            price: '',
            category: '',
            quantity: '',
            condition: '',
            brand: '',
            status: 'active',
            images: [],
            imageFiles: []
          }
        }));
        fetchDashboardData(); // Refresh dashboard
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('حدث خطأ أثناء إضافة المنتج');
    } finally {
      setUploadingImages(false);
    }
  };

  const openPopup = (popupType) => {
    setActivePopup(popupType);

    // Fetch data based on popup type
    switch (popupType) {
      case 'orders':
        fetchRecentOrders();
        break;
      case 'donations':
        fetchPendingDonations();
        break;
      case 'analytics':
        fetchAnalytics();
        break;
      default:
        break;
    }
  };

  const closePopup = () => {
    setActivePopup(null);
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
            <RefreshCw
              className={`w-4 h-4 ml-2 ${loading ? "animate-spin" : ""}`}
            />
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
                    <p className="text-sm font-medium text-gray-600">
                      إجمالي المنتجات
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalProducts || 0}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats?.activeProducts || 0} نشط
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
                    <p className="text-sm font-medium text-gray-600">
                      إجمالي الطلبات
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalOrders || 0}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats?.totalRevenue || 0} درهم
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
                    <p className="text-sm font-medium text-gray-600">
                      إجمالي المستخدمين
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalUsers || 0}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats?.activeUsers || 0} نشط
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
                    <p className="text-sm font-medium text-gray-600">
                      طلبات التبرع
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.totalDonations || 0}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stats?.pendingDonations || 0} في الانتظار
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  إجراءات سريعة
                </h3>
                <div className="space-y-3">
                  <Dialog
                    open={activePopup === "product"}
                    onOpenChange={(open) => !open && closePopup()}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full justify-start bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => openPopup("product")}
                      >
                        <Plus className="w-4 h-4 ml-2" />
                        إضافة منتج جديد
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>إضافة منتج جديد</DialogTitle>
                        <DialogDescription>
                          أدخل بيانات المنتج الجديد
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            الاسم *
                          </Label>
                          <Input
                            id="name"
                            value={popupData.newProduct.name}
                            onChange={(e) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  name: e.target.value,
                                },
                              }))
                            }
                            className="col-span-3"
                            placeholder="أدخل اسم المنتج"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            الوصف *
                          </Label>
                          <Textarea
                            id="description"
                            value={popupData.newProduct.description}
                            onChange={(e) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  description: e.target.value,
                                },
                              }))
                            }
                            className="col-span-3"
                            placeholder="أدخل وصف المنتج"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="price" className="text-right">
                            السعر *
                          </Label>
                          <Input
                            id="price"
                            type="number"
                            value={popupData.newProduct.price}
                            onChange={(e) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  price: e.target.value,
                                },
                              }))
                            }
                            className="col-span-3"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            الفئة *
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  category: value,
                                },
                              }))
                            }
                          >
                            <SelectTrigger className="col-span-3 border-2 border-gray-300 bg-white text-gray-900 hover:border-blue-500 focus:border-blue-500">
                              <SelectValue placeholder="اختر الفئة" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-2 border-blue-200">
                              <SelectItem
                                value="electronics"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                إلكترونيات
                              </SelectItem>
                              <SelectItem
                                value="furniture"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                أثاث
                              </SelectItem>
                              <SelectItem
                                value="clothing"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                ملابس
                              </SelectItem>
                              <SelectItem
                                value="books"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                كتب
                              </SelectItem>
                              <SelectItem
                                value="home-appliances"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                أدوات منزلية
                              </SelectItem>
                              <SelectItem
                                value="sports"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                رياضة
                              </SelectItem>
                              <SelectItem
                                value="toys"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                ألعاب
                              </SelectItem>
                              <SelectItem
                                value="other"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                أخرى
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="quantity" className="text-right">
                            الكمية *
                          </Label>
                          <Input
                            id="quantity"
                            type="number"
                            value={popupData.newProduct.quantity}
                            onChange={(e) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  quantity: e.target.value,
                                },
                              }))
                            }
                            className="col-span-3"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="condition" className="text-right">
                            الحالة *
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  condition: value,
                                },
                              }))
                            }
                          >
                            <SelectTrigger className="col-span-3 border-2 border-gray-300 bg-white text-gray-900 hover:border-blue-500 focus:border-blue-500">
                              <SelectValue placeholder="اختر الحالة" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-2 border-blue-200">
                              <SelectItem
                                value="new"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                جديد
                              </SelectItem>
                              <SelectItem
                                value="like-new"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                شبه جديد
                              </SelectItem>
                              <SelectItem
                                value="good"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                جيد
                              </SelectItem>
                              <SelectItem
                                value="fair"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                مقبول
                              </SelectItem>
                              <SelectItem
                                value="poor"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                سيء
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="brand" className="text-right">
                            الماركة
                          </Label>
                          <Input
                            id="brand"
                            value={popupData.newProduct.brand}
                            onChange={(e) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  brand: e.target.value,
                                },
                              }))
                            }
                            className="col-span-3"
                            placeholder="أدخل اسم الماركة (اختياري)"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            حالة المنتج
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setPopupData((prev) => ({
                                ...prev,
                                newProduct: {
                                  ...prev.newProduct,
                                  status: value,
                                },
                              }))
                            }
                          >
                            <SelectTrigger className="col-span-3 border-2 border-gray-300 bg-white text-gray-900 hover:border-blue-500 focus:border-blue-500">
                              <SelectValue placeholder="اختر حالة المنتج" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-2 border-blue-200">
                              <SelectItem
                                value="active"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                نشط
                              </SelectItem>
                              <SelectItem
                                value="inactive"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                غير نشط
                              </SelectItem>
                              <SelectItem
                                value="out-of-stock"
                                className="text-gray-900 hover:bg-blue-50 focus:bg-blue-100"
                              >
                                نفد المخزون
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="images" className="text-right">
                            صور المنتج
                          </Label>
                          <div className="col-span-3">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-emerald-400 transition-colors">
                              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <Input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              <Label
                                htmlFor="images"
                                className="cursor-pointer"
                              >
                                <span className="text-emerald-600 hover:text-emerald-700 font-medium">
                                  اضغط لاختيار الصور
                                </span>
                                <p className="text-xs text-gray-500 mt-1">
                                  يمكنك اختيار صور متعددة (PNG, JPG, JPEG)
                                </p>
                              </Label>
                            </div>

                            {/* Image Preview */}
                            {popupData.newProduct.images.length > 0 && (
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                {popupData.newProduct.images.map(
                                  (image, index) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={image}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-20 object-cover rounded-lg border"
                                      />
                                      <button
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 space-x-reverse">
                        <Button
                          variant="outline"
                          onClick={closePopup}
                          disabled={uploadingImages}
                        >
                          إلغاء
                        </Button>
                        <Button
                          onClick={handleCreateProduct}
                          disabled={uploadingImages}
                        >
                          {uploadingImages ? (
                            <>
                              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                              جاري الرفع...
                            </>
                          ) : (
                            "إضافة المنتج"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activePopup === "orders"}
                    onOpenChange={(open) => !open && closePopup()}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => openPopup("orders")}
                      >
                        <Eye className="w-4 h-4 ml-2" />
                        مراجعة الطلبات الجديدة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>الطلبات الجديدة</DialogTitle>
                        <DialogDescription>
                          مراجعة وإدارة الطلبات الجديدة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[400px] overflow-y-auto">
                        {popupLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {popupData.recentOrders.map((order) => (
                              <div
                                key={order._id}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium">
                                      طلب #{order._id.slice(-6)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {order.user?.name}
                                    </p>
                                  </div>
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    {order.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <p>المجموع: {order.totalPrice} درهم</p>
                                  <p>
                                    تاريخ الطلب:{" "}
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString("ar")}
                                  </p>
                                </div>
                              </div>
                            ))}
                            {popupData.recentOrders.length === 0 && (
                              <p className="text-center text-gray-500 py-8">
                                لا توجد طلبات جديدة
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activePopup === "donations"}
                    onOpenChange={(open) => !open && closePopup()}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => openPopup("donations")}
                      >
                        <Heart className="w-4 h-4 ml-2" />
                        مراجعة طلبات التبرع
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>طلبات التبرع</DialogTitle>
                        <DialogDescription>
                          مراجعة وإدارة طلبات التبرع الجديدة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[400px] overflow-y-auto">
                        {popupLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {popupData.pendingDonations.map((donation) => (
                              <div
                                key={donation._id}
                                className="border rounded-lg p-4"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium">
                                      {donation.donorName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {donation.donorPhone}
                                    </p>
                                  </div>
                                  <Badge className="bg-blue-100 text-blue-800">
                                    {donation.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <p>الموقع: {donation.location}</p>
                                  <p>
                                    عدد العناصر: {donation.items?.length || 0}
                                  </p>
                                  <p>
                                    تاريخ الطلب:{" "}
                                    {new Date(
                                      donation.createdAt
                                    ).toLocaleDateString("ar")}
                                  </p>
                                </div>
                                {donation.notes && (
                                  <p className="text-sm text-gray-500 mt-2">
                                    ملاحظات: {donation.notes}
                                  </p>
                                )}
                              </div>
                            ))}
                            {popupData.pendingDonations.length === 0 && (
                              <p className="text-center text-gray-500 py-8">
                                لا توجد طلبات تبرع في الانتظار
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={activePopup === "analytics"}
                    onOpenChange={(open) => !open && closePopup()}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => openPopup("analytics")}
                      >
                        <BarChart3 className="w-4 h-4 ml-2" />
                        عرض التحليلات
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>التحليلات السريعة</DialogTitle>
                        <DialogDescription>
                          نظرة عامة على أداء المنصة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[400px] overflow-y-auto">
                        {popupLoading ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                          </div>
                        ) : popupData.analytics ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600">
                                  معدل التحويل
                                </p>
                                <p className="text-2xl font-bold text-blue-800">
                                  {popupData.analytics.conversionRate}%
                                </p>
                              </div>
                              <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600">
                                  متوسط قيمة الطلب
                                </p>
                                <p className="text-2xl font-bold text-green-800">
                                  {popupData.analytics.averageOrderValue} درهم
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">المنتجات النشطة</span>
                                <span className="font-medium">
                                  {popupData.analytics.activeProducts}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">الطلبات المعلقة</span>
                                <span className="font-medium">
                                  {popupData.analytics.pendingOrders}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">
                                  طلبات التبرع المعلقة
                                </span>
                                <span className="font-medium">
                                  {popupData.analytics.pendingDonations}
                                </span>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <span className="text-sm">
                                  المستخدمون النشطون
                                </span>
                                <span className="font-medium">
                                  {popupData.analytics.activeUsers}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-center text-gray-500 py-8">
                            لا توجد بيانات تحليلية متاحة
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  التنبيهات
                </h3>
                <div className="space-y-4">
                  {stats.stats?.lowStockProducts > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-yellow-100">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          منتجات نفد مخزونها
                        </p>
                        <p className="text-sm text-gray-600">
                          {stats.stats.lowStockProducts} منتج يحتاج إعادة تخزين
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.stats?.pendingOrders > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-blue-100">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          طلبات في الانتظار
                        </p>
                        <p className="text-sm text-gray-600">
                          {stats.stats.pendingOrders} طلب يحتاج معالجة
                        </p>
                      </div>
                    </div>
                  )}

                  {stats.stats?.pendingDonations > 0 && (
                    <div className="flex items-start space-x-3 space-x-reverse">
                      <div className="p-2 rounded-full bg-red-100">
                        <Heart className="w-4 h-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          طلبات تبرع جديدة
                        </p>
                        <p className="text-sm text-gray-600">
                          {stats.stats.pendingDonations} طلب تبرع في الانتظار
                        </p>
                      </div>
                    </div>
                  )}

                  {!stats.stats?.lowStockProducts &&
                    !stats.stats?.pendingOrders &&
                    !stats.stats?.pendingDonations && (
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="p-2 rounded-full bg-green-100">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            كل شيء على ما يرام
                          </p>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                النشاط الحديث
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-blue-100">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      طلب جديد #1234
                    </p>
                    <p className="text-sm text-gray-600">منذ 5 دقائق</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    في الانتظار
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-green-100">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      تم تسليم طلب #1233
                    </p>
                    <p className="text-sm text-gray-600">منذ 15 دقيقة</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    تم التسليم
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 rounded-full bg-red-100">
                    <Heart className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      طلب تبرع جديد
                    </p>
                    <p className="text-sm text-gray-600">منذ ساعة</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    في الانتظار
                  </Badge>
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
