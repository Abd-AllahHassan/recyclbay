import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Heart,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Phone,
  MapPin,
  Package,
  MessageSquare,
  Filter,
  Search,
  Eye,
  AlertCircle,
  RefreshCw,
  Camera,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import apiService from '@/services/apiService';

const DonationsManagement = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    adminNotes: '',
    rejectionReason: '',
    estimatedPickupDate: ''
  });

  const statuses = [
    { value: 'all', label: 'جميع الطلبات' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'approved', label: 'مُعتمد' },
    { value: 'rejected', label: 'مرفوض' },
    { value: 'picked-up', label: 'تم الاستلام' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'electronics', label: 'إلكترونيات' },
    { value: 'furniture', label: 'أثاث' },
    { value: 'clothing', label: 'ملابس' },
    { value: 'books', label: 'كتب' },
    { value: 'home-appliances', label: 'أجهزة منزلية' },
    { value: 'sports', label: 'رياضة' },
    { value: 'toys', label: 'ألعاب' },
    { value: 'other', label: 'أخرى' }
  ];

  const conditions = {
    'new': 'جديد',
    'like-new': 'شبه جديد',
    'good': 'جيد',
    'fair': 'مقبول',
    'poor': 'سيء'
  };

  useEffect(() => {
    fetchDonations();
  }, [currentPage, selectedStatus, selectedCategory]);

  const fetchDonations = async () => {
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

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      const response = await apiService.getDonations(params);

      if (response && response.success) {
        setDonations(response.data || []);
        setTotalPages(Math.ceil(response.pagination?.total / 10) || 1);
      } else {
        setError(`فشل في تحميل طلبات التبرع: ${response?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
      setError(`حدث خطأ أثناء تحميل طلبات التبرع: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateDonationStatus = async (donationId, updateData) => {
    try {
      setLoading(true);
      const response = await apiService.updateDonation(donationId, updateData);

      if (response.success) {
        // Update local state
        const updatedDonations = donations.map(donation =>
          donation._id === donationId ? { ...donation, ...updateData } : donation
        );
        setDonations(updatedDonations);
        
        // Close modal if open
        setShowUpdateModal(false);
        setSelectedDonation(null);
        
        // Show success message
        alert('تم تحديث حالة طلب التبرع بنجاح');
        
        // Refresh data
        fetchDonations();
      } else {
        setError('فشل في تحديث حالة طلب التبرع');
        alert('فشل في تحديث حالة طلب التبرع. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error updating donation:', error);
      setError('حدث خطأ أثناء تحديث طلب التبرع');
      alert('حدث خطأ أثناء تحديث طلب التبرع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (donation, newStatus) => {
    setSelectedDonation(donation);
    setUpdateForm({
      status: newStatus,
      adminNotes: donation.adminNotes || '',
      rejectionReason: donation.rejectionReason || '',
      estimatedPickupDate: donation.estimatedPickupDate || ''
    });
    setShowUpdateModal(true);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setShowDetailsModal(true);
  };

  const submitStatusUpdate = () => {
    if (!selectedDonation) return;

    // Validation for rejection reason
    if (updateForm.status === 'rejected' && !updateForm.rejectionReason.trim()) {
      alert('يرجى إدخال سبب الرفض');
      return;
    }

    const updateData = {
      status: updateForm.status,
      adminNotes: updateForm.adminNotes
    };

    if (updateForm.status === 'rejected') {
      updateData.rejectionReason = updateForm.rejectionReason;
    }

    if (updateForm.status === 'approved' && updateForm.estimatedPickupDate) {
      updateData.estimatedPickupDate = updateForm.estimatedPickupDate;
    }

    updateDonationStatus(selectedDonation._id, updateData);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مُعتمد</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'picked-up':
        return <Badge className="bg-blue-100 text-blue-800">تم الاستلام</Badge>;
      case 'completed':
        return <Badge className="bg-purple-100 text-purple-800">مكتمل</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800">ملغي</Badge>;
      default:
        return <Badge>غير محدد</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'picked-up':
        return <Package className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      'electronics': 'إلكترونيات',
      'furniture': 'أثاث',
      'clothing': 'ملابس',
      'books': 'كتب',
      'home-appliances': 'أجهزة منزلية',
      'sports': 'رياضة',
      'toys': 'ألعاب',
      'other': 'أخرى'
    };
    return categoryMap[category] || category;
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorInfo?.phone?.includes(searchTerm) ||
                         donation.donorInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.itemDescription?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.itemDescription?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const pendingCount = donations.filter(d => d.status === 'pending').length;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading && donations.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <span className="mr-3 text-gray-600">جاري تحميل طلبات التبرع...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>إدارة التبرعات - RecycleBay Admin</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">إدارة التبرعات</h1>
            <p className="text-gray-600 mt-1">مراجعة وإدارة طلبات التبرع الواردة</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button
              onClick={fetchDonations}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
            <Badge className="bg-yellow-100 text-yellow-800">
              {pendingCount} طلب في الانتظار
            </Badge>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="البحث في طلبات التبرع..."
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

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>

            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
              variant="outline"
              size="sm"
            >
              <Filter className="w-4 h-4 ml-2" />
              إعادة الضبط
            </Button>
          </div>
        </div>

        {/* Donations List */}
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {donation.itemDescription?.title || 'غير محدد'}
                      </h3>
                      {getStatusBadge(donation.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-2" />
                        {donation.donorInfo?.name || 'غير محدد'}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 ml-2" />
                        {donation.donorInfo?.phone || 'غير محدد'}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 ml-2" />
                        {donation.donorInfo?.address?.city || 'غير محدد'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">تفاصيل المتبرع:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">الاسم:</span> {donation.donorInfo?.name}</p>
                          <p><span className="font-medium">البريد الإلكتروني:</span> {donation.donorInfo?.email}</p>
                          <p><span className="font-medium">الهاتف:</span> {donation.donorInfo?.phone}</p>
                          {donation.donorInfo?.address && (
                            <p><span className="font-medium">العنوان:</span> {donation.donorInfo.address.street}, {donation.donorInfo.address.city}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">تفاصيل المتبرع به:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">الفئة:</span> {getCategoryLabel(donation.itemDescription?.category)}</p>
                          <p><span className="font-medium">الحالة:</span> {conditions[donation.itemDescription?.condition] || donation.itemDescription?.condition}</p>
                          <p><span className="font-medium">الكمية:</span> {donation.itemDescription?.quantity || 1}</p>
                          {donation.itemDescription?.estimatedValue && (
                            <p><span className="font-medium">القيمة التقريبية:</span> {donation.itemDescription.estimatedValue} درهم</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {donation.itemDescription?.description && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <MessageSquare className="w-4 h-4 text-blue-600 ml-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800">وصف المتبرع به:</p>
                            <p className="text-sm text-blue-700 mt-1">{donation.itemDescription.description}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {donation.pickupInfo && (
                      <div className="bg-green-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <Calendar className="w-4 h-4 text-green-600 ml-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-800">معلومات الاستلام:</p>
                            <div className="text-sm text-green-700 mt-1">
                              {donation.pickupInfo.preferredDate && (
                                <p>التاريخ المفضل: {new Date(donation.pickupInfo.preferredDate).toLocaleDateString('ar-SA')}</p>
                              )}
                              {donation.pickupInfo.preferredTime && (
                                <p>الوقت المفضل: {donation.pickupInfo.preferredTime}</p>
                              )}
                              {donation.pickupInfo.specialInstructions && (
                                <p>تعليمات خاصة: {donation.pickupInfo.specialInstructions}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {donation.status === 'rejected' && donation.rejectionReason && (
                      <div className="bg-red-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="w-4 h-4 text-red-600 ml-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800">سبب الرفض:</p>
                            <p className="text-sm text-red-700">{donation.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {donation.adminNotes && (
                      <div className="bg-yellow-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <MessageSquare className="w-4 h-4 text-yellow-600 ml-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">ملاحظات الإدارة:</p>
                            <p className="text-sm text-yellow-700">{donation.adminNotes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Images Display */}
                    {donation.images && donation.images.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">الصور:</h4>
                        <div className="flex flex-wrap gap-2">
                          {donation.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image}
                                alt={`صورة ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                                onClick={() => window.open(image, '_blank')}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    onClick={() => handleViewDetails(donation)}
                    variant="outline"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 ml-2" />
                    التفاصيل
                  </Button>

                  {donation.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleStatusUpdate(donation, 'approved')}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 ml-2" />
                        اعتماد
                      </Button>

                      <Button
                        onClick={() => handleStatusUpdate(donation, 'rejected')}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 ml-2" />
                        رفض
                      </Button>
                    </>
                  )}

                  {(donation.status === 'approved' || donation.status === 'picked-up') && (
                    <Button
                      onClick={() => handleStatusUpdate(donation, donation.status === 'approved' ? 'picked-up' : 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Package className="w-4 h-4 ml-2" />
                      {donation.status === 'approved' ? 'تم الاستلام' : 'مكتمل'}
                    </Button>
                  )}

                  {donation.status !== 'cancelled' && donation.status !== 'completed' && (
                    <Button
                      onClick={() => handleStatusUpdate(donation, 'cancelled')}
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 ml-2" />
                      إلغاء
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDonations.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات تبرع</h3>
            <p className="text-gray-500">لم يتم العثور على طلبات تبرع تطابق معايير البحث</p>
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
              <span className="font-medium">{Math.min(currentPage * 10, donations.length)}</span> من أصل{' '}
              <span className="font-medium">{donations.length}</span> نتيجة
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                السابق
              </Button>
              <span className="px-3 py-1 text-sm text-gray-700">
                الصفحة {currentPage} من {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                التالي
              </Button>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    تفاصيل طلب التبرع #{selectedDonation._id.slice(-8)}
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
                  {/* Donor Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">معلومات المتبرع</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">الاسم:</span>
                        <span className="mr-2">{selectedDonation.donorInfo?.name || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">البريد الإلكتروني:</span>
                        <span className="mr-2">{selectedDonation.donorInfo?.email || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">الهاتف:</span>
                        <span className="mr-2">{selectedDonation.donorInfo?.phone || 'غير محدد'}</span>
                      </div>
                      {selectedDonation.donorInfo?.address && (
                        <div>
                          <span className="font-medium text-gray-700">العنوان:</span>
                          <div className="mr-2 mt-1">
                            <p>{selectedDonation.donorInfo.address.street}</p>
                            <p>{selectedDonation.donorInfo.address.city}, {selectedDonation.donorInfo.address.state} {selectedDonation.donorInfo.address.zipCode}</p>
                            <p>{selectedDonation.donorInfo.address.country}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Item Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">معلومات المتبرع به</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">العنوان:</span>
                        <span className="mr-2">{selectedDonation.itemDescription?.title || 'غير محدد'}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">الفئة:</span>
                        <span className="mr-2">{getCategoryLabel(selectedDonation.itemDescription?.category)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">الحالة:</span>
                        <span className="mr-2">{conditions[selectedDonation.itemDescription?.condition] || selectedDonation.itemDescription?.condition}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">الكمية:</span>
                        <span className="mr-2">{selectedDonation.itemDescription?.quantity || 1}</span>
                      </div>
                      {selectedDonation.itemDescription?.estimatedValue && (
                        <div>
                          <span className="font-medium text-gray-700">القيمة التقريبية:</span>
                          <span className="mr-2">{selectedDonation.itemDescription.estimatedValue} درهم</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                {selectedDonation.itemDescription?.description && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">الوصف</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedDonation.itemDescription.description}</p>
                    </div>
                  </div>
                )}

                {/* Pickup Information */}
                {selectedDonation.pickupInfo && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الاستلام</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {selectedDonation.pickupInfo.preferredDate && (
                        <div>
                          <span className="font-medium text-gray-700">التاريخ المفضل:</span>
                          <span className="mr-2">{new Date(selectedDonation.pickupInfo.preferredDate).toLocaleDateString('ar-SA')}</span>
                        </div>
                      )}
                      {selectedDonation.pickupInfo.preferredTime && (
                        <div>
                          <span className="font-medium text-gray-700">الوقت المفضل:</span>
                          <span className="mr-2">{selectedDonation.pickupInfo.preferredTime}</span>
                        </div>
                      )}
                      {selectedDonation.pickupInfo.specialInstructions && (
                        <div>
                          <span className="font-medium text-gray-700">تعليمات خاصة:</span>
                          <span className="mr-2">{selectedDonation.pickupInfo.specialInstructions}</span>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-gray-700">يتطلب استلام:</span>
                        <span className="mr-2">{selectedDonation.pickupInfo.isPickupRequired ? 'نعم' : 'لا'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Images */}
                {selectedDonation.images && selectedDonation.images.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">الصور</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedDonation.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`صورة ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80"
                            onClick={() => window.open(image, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status History */}
                {selectedDonation.statusHistory && selectedDonation.statusHistory.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">تاريخ تغيير الحالة</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {selectedDonation.statusHistory.map((history, index) => (
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

                {/* Admin Notes */}
                {selectedDonation.adminNotes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ملاحظات الإدارة</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedDonation.adminNotes}</p>
                    </div>
                  </div>
                )}

                {/* Rejection Reason */}
                {selectedDonation.rejectionReason && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">سبب الرفض</h3>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-red-700">{selectedDonation.rejectionReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Update Status Modal */}
        {showUpdateModal && selectedDonation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    تحديث حالة طلب التبرع
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    <XCircle className="w-4 h-4 ml-2" />
                    إلغاء
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحالة الجديدة
                    </label>
                    <select
                      value={updateForm.status}
                      onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">اختر الحالة</option>
                      <option value="approved">مُعتمد</option>
                      <option value="rejected">مرفوض</option>
                      <option value="picked-up">تم الاستلام</option>
                      <option value="completed">مكتمل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>

                  {updateForm.status === 'rejected' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        سبب الرفض *
                      </label>
                      <textarea
                        value={updateForm.rejectionReason}
                        onChange={(e) => setUpdateForm({...updateForm, rejectionReason: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        rows={3}
                        placeholder="يرجى توضيح سبب الرفض..."
                        required
                      />
                    </div>
                  )}

                  {updateForm.status === 'approved' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تاريخ الاستلام المتوقع
                      </label>
                      <input
                        type="date"
                        value={updateForm.estimatedPickupDate}
                        onChange={(e) => setUpdateForm({...updateForm, estimatedPickupDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ملاحظات الإدارة
                    </label>
                    <textarea
                      value={updateForm.adminNotes}
                      onChange={(e) => setUpdateForm({...updateForm, adminNotes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={3}
                      placeholder="أي ملاحظات إضافية..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 space-x-reverse mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    onClick={submitStatusUpdate}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                        جاري التحديث...
                      </>
                    ) : (
                      'تحديث الحالة'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DonationsManagement;