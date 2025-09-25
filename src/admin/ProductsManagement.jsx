import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Upload,
  X,
  ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiService from '@/services/apiService';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: '',
    category: '',
    condition: 'جديد',
    quantity: '',
    location: '',
    status: 'active'
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = ['إلكترونيات', 'أثاث', 'رياضة', 'أدوات منزلية', 'ملابس', 'كتب'];
  const statuses = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'low_stock', label: 'مخزون منخفض' },
    { value: 'out_of_stock', label: 'نفد المخزون' },
    { value: 'inactive', label: 'غير نشط' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, selectedStatus]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page: currentPage,
        limit: 10,
      };

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (selectedStatus !== 'all') {
        params.status = selectedStatus;
      }

      const response = await apiService.getProducts(params);

      if (response.success) {
        setProducts(response.data);
        setTotalPages(Math.ceil(response.pagination?.total / 10) || 1);
      } else {
        setError('فشل في تحميل المنتجات');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('حدث خطأ أثناء تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      return;
    }

    try {
      const response = await apiService.deleteProduct(productId);

      if (response.success) {
        setProducts(products.filter(product => product._id !== productId));
      } else {
        setError('فشل في حذف المنتج');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('حدث خطأ أثناء حذف المنتج');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-100 text-yellow-800">مخزون منخفض</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-800">نفد المخزون</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">غير نشط</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getStockIcon = (quantity) => {
    if (quantity === 0) return <XCircle className="w-4 h-4 text-red-500" />;
    if (quantity <= 5) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameEn?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Form handlers
  const resetForm = () => {
    setProductForm({
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      price: '',
      category: '',
      condition: 'جديد',
      quantity: '',
      location: '',
      status: 'active'
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handleInputChange = (field, value) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  // CRUD handlers
  const handleAddProduct = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name || '',
      nameEn: product.nameEn || '',
      description: product.description || '',
      descriptionEn: product.descriptionEn || '',
      price: product.price || '',
      category: product.category || '',
      condition: product.condition || 'جديد',
      quantity: product.quantity || '',
      location: product.location || '',
      status: product.status || 'active'
    });
    setShowEditModal(true);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!productForm.name || !productForm.price || !productForm.category) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        quantity: parseInt(productForm.quantity)
      };

      let response;
      if (showEditModal) {
        // For editing, always use updateProductWithImages to preserve existing images
        response = await apiService.updateProductWithImages(selectedProduct._id, productData, selectedImages);
      } else {
        // For new products, always include images
        response = await apiService.createProductWithImages(productData, selectedImages);
      }

      if (response.success) {
        setSuccess(showEditModal ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
        fetchProducts();
        setShowAddModal(false);
        setShowEditModal(false);
        resetForm();
      } else {
        setError('فشل في حفظ المنتج');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError('حدث خطأ أثناء حفظ المنتج');
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
        <title>إدارة المنتجات - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h1>
            <p className="text-gray-600 mt-1">إدارة ومراقبة جميع المنتجات في المنصة</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              onClick={fetchProducts}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <Button
              onClick={handleAddProduct}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة منتج جديد
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
                  placeholder="البحث في المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">جميع الفئات</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

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
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المنتج
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    السعر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المخزون
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-12 w-12 rounded-lg object-cover ml-4"
                          src={product.images || 'https://via.placeholder.com/100'}
                          alt={product.name}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.location || 'غير محدد'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                      <div className="text-sm text-gray-500">{product.condition || 'جديد'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price} درهم
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStockIcon(product.quantity || 0)}
                        <span className="text-sm text-gray-900 mr-2">{product.quantity || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status || 'active')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد منتجات</h3>
              <p className="text-gray-500">لم يتم العثور على منتجات تطابق معايير البحث</p>
            </div>
          )}
        </div>

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
              <span className="font-medium">{Math.min(currentPage * 10, products.length)}</span> من أصل{' '}
              <span className="font-medium">{products.length}</span> نتيجة
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

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 ml-3" />
              <p className="text-green-800">{success}</p>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      <Dialog open={showAddModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowAddModal(false);
          setShowEditModal(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {showEditModal ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitProduct} className="space-y-6">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  الاسم *
                </Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                  placeholder="أدخل اسم المنتج"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  الوصف *
                </Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="col-span-3"
                  placeholder="أدخل وصف المنتج"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  السعر *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={productForm.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="col-span-3"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  الفئة *
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange('category', value)}
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
                  value={productForm.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="col-span-3"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="condition" className="text-right">
                  الحالة *
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange('condition', value)}
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
                  value={productForm.brand || ''}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="col-span-3"
                  placeholder="أدخل اسم الماركة (اختياري)"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  حالة المنتج
                </Label>
                <Select
                  onValueChange={(value) => handleInputChange('status', value)}
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
            </div>

            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={productForm.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="أدخل وصف المنتج"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="descriptionEn">Description (English)</Label>
              <Textarea
                id="descriptionEn"
                value={productForm.descriptionEn}
                onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                placeholder="Enter product description in English"
                rows={3}
              />
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
                    onChange={handleImageSelect}
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
                {imagePreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
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
                    ))}
                  </div>
                )}

                {/* Show existing images for edit mode */}
                {showEditModal && selectedProduct?.images && selectedProduct.images.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">الصور الحالية:</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Current ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border"
                          />
                          <span className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            موجود
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? 'جاري الحفظ...' : (showEditModal ? 'تحديث' : 'إضافة')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>تفاصيل المنتج</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">المعلومات الأساسية</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">اسم المنتج</Label>
                      <p className="text-sm">{selectedProduct.name}</p>
                    </div>
                    {selectedProduct.nameEn && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Product Name (EN)</Label>
                        <p className="text-sm">{selectedProduct.nameEn}</p>
                      </div>
                    )}
                    <div>
                      <Label className="text-sm font-medium text-gray-600">السعر</Label>
                      <p className="text-sm">{selectedProduct.price} درهم</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">الفئة</Label>
                      <p className="text-sm">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">الحالة</Label>
                      <p className="text-sm">{selectedProduct.condition || 'جديد'}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">المخزون</Label>
                      <p className="text-sm">{selectedProduct.quantity || 0}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">حالة المنتج</Label>
                      <div className="mt-1">
                        {getStatusBadge(selectedProduct.status || 'active')}
                      </div>
                    </div>
                    {selectedProduct.location && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">الموقع</Label>
                        <p className="text-sm">{selectedProduct.location}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">الوصف</h3>
                  <div className="space-y-3">
                    {selectedProduct.description && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">الوصف</Label>
                        <p className="text-sm mt-1">{selectedProduct.description}</p>
                      </div>
                    )}
                    {selectedProduct.descriptionEn && (
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Description (EN)</Label>
                        <p className="text-sm mt-1">{selectedProduct.descriptionEn}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">صور المنتج</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProduct.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={() => setShowViewModal(false)}>
              إغلاق
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsManagement;
