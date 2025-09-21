import React, { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const DonationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Mock data - in real app, this would come from API
  const donations = [
    {
      id: 1,
      donorName: 'أحمد محمد',
      donorPhone: '+971501234567',
      donorEmail: 'ahmed@example.com',
      location: 'دبي',
      items: [
        { name: 'هاتف ذكي سامسونج', condition: 'جيد', quantity: 1 },
        { name: 'شاحن هاتف', condition: 'ممتاز', quantity: 1 }
      ],
      status: 'pending',
      requestDate: '2024-01-15',
      notes: 'أجهزة إلكترونية مستعملة بحالة جيدة',
      images: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200']
    },
    {
      id: 2,
      donorName: 'فاطمة علي',
      donorPhone: '+971507654321',
      donorEmail: 'fatima@example.com',
      location: 'أبوظبي',
      items: [
        { name: 'كرسي مكتب', condition: 'جيد جداً', quantity: 2 },
        { name: 'مكتب خشبي', condition: 'جيد', quantity: 1 }
      ],
      status: 'approved',
      requestDate: '2024-01-14',
      notes: 'أثاث مكتبي بحالة ممتازة',
      images: ['https://via.placeholder.com/200']
    },
    {
      id: 3,
      donorName: 'محمد حسن',
      donorPhone: '+971509876543',
      donorEmail: 'mohamed@example.com',
      location: 'الشارقة',
      items: [
        { name: 'ملابس أطفال', condition: 'جيد', quantity: 10 },
        { name: 'ألعاب أطفال', condition: 'ممتاز', quantity: 5 }
      ],
      status: 'rejected',
      requestDate: '2024-01-13',
      notes: 'ملابس وألعاب أطفال مستعملة',
      rejectionReason: 'الأغراض غير مناسبة للمنصة'
    }
  ];

  const statuses = [
    { value: 'all', label: 'جميع الطلبات' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'approved', label: 'مُعتمد' },
    { value: 'rejected', label: 'مرفوض' },
    { value: 'collected', label: 'تم الاستلام' }
  ];

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.donorPhone.includes(searchTerm) ||
                         donation.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || donation.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">في الانتظار</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">مُعتمد</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">مرفوض</Badge>;
      case 'collected':
        return <Badge className="bg-blue-100 text-blue-800">تم الاستلام</Badge>;
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
      case 'collected':
        return <Package className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleApproveDonation = (donationId) => {
    // Handle approval logic here
    console.log('Approving donation:', donationId);
  };

  const handleRejectDonation = (donationId) => {
    // Handle rejection logic here
    console.log('Rejecting donation:', donationId);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setShowDetailsModal(true);
  };

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
            <Badge className="bg-yellow-100 text-yellow-800">
              {donations.filter(d => d.status === 'pending').length} طلب في الانتظار
            </Badge>
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
          </div>
        </div>

        {/* Donations List */}
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{donation.donorName}</h3>
                      {getStatusBadge(donation.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 ml-2" />
                        {donation.donorPhone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 ml-2" />
                        {donation.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-2" />
                        {donation.requestDate}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">الأغراض المُتبرع بها:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {donation.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Badge variant="outline">{item.condition}</Badge>
                              <span className="text-sm text-gray-500">({item.quantity})</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {donation.notes && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-4">
                        <div className="flex items-start">
                          <MessageSquare className="w-4 h-4 text-blue-600 ml-2 mt-0.5" />
                          <p className="text-sm text-blue-800">{donation.notes}</p>
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
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
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
                        onClick={() => handleApproveDonation(donation.id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 ml-2" />
                        اعتماد
                      </Button>

                      <Button
                        onClick={() => handleRejectDonation(donation.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 ml-2" />
                        رفض
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات تبرع</h3>
            <p className="text-gray-500">لم يتم العثور على طلبات تبرع تطابق معايير البحث</p>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedDonation && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">تفاصيل طلب التبرع</h3>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">اسم المتبرع</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDonation.donorName}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDonation.donorPhone}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDonation.donorEmail}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">الموقع</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDonation.location}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">الأغراض</label>
                      <div className="mt-2 space-y-2">
                        {selectedDonation.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <span>{item.name}</span>
                            <Badge variant="outline">{item.condition}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedDonation.notes && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDonation.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    onClick={() => setShowDetailsModal(false)}
                    className="w-full sm:w-auto"
                  >
                    إغلاق
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
