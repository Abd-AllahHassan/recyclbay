import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import LocationMap from '@/components/LocationMap';
import { Button } from '@/components/ui/button';
import apiService from '@/services/apiService';

const DonationsPage = () => {
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [itemDescription, setItemDescription] = useState({ title: '', description: '', category: '', condition: '' });
  const [pickupInfo, setPickupInfo] = useState({ preferredDate: '', preferredTime: '', specialInstructions: '' });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');



  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      // Validate required fields
      if (!donorInfo.name || donorInfo.name.trim().length < 2) {
        setSubmitError('يرجى إدخال اسم المتبرع (2 أحرف على الأقل)');
        setSubmitting(false);
        return;
      }

      if (!donorInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorInfo.email)) {
        setSubmitError('يرجى إدخال بريد إلكتروني صحيح');
        setSubmitting(false);
        return;
      }

      if (!donorInfo.phone || donorInfo.phone.trim().length < 10) {
        setSubmitError('يرجى إدخال رقم هاتف صحيح');
        setSubmitting(false);
        return;
      }

      if (!itemDescription.title || itemDescription.title.trim().length < 1) {
        setSubmitError('يرجى إدخال عنوان القطعة');
        setSubmitting(false);
        return;
      }

      if (!itemDescription.description || itemDescription.description.trim().length < 10) {
        setSubmitError('يرجى إدخال وصف مفصل للقطعة (10 أحرف على الأقل)');
        setSubmitting(false);
        return;
      }

      if (!itemDescription.category) {
        setSubmitError('يرجى اختيار الفئة');
        setSubmitting(false);
        return;
      }

      // Create the donation directly with donor info
      const donationData = {
        donorInfo: {
          name: donorInfo.name.trim(),
          email: donorInfo.email.trim(),
          phone: donorInfo.phone.trim(),
          address: donorInfo.address
        },
        itemDescription: {
          title: itemDescription.title.trim(),
          description: itemDescription.description.trim(),
          category: itemDescription.category,
          condition: itemDescription.condition || 'good',
          quantity: 1
        },
        pickupInfo: {
          preferredDate: pickupInfo.preferredDate || null,
          preferredTime: pickupInfo.preferredTime || null,
          specialInstructions: pickupInfo.specialInstructions?.trim() || '',
          isPickupRequired: true
        },
        images: [] // Array of image URLs or files
      };

      // Send donation data as JSON
      const response = await fetch('http://localhost:5000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('تم تقديم طلب التبرع بنجاح! شكراً لك على مساهمتك في إعادة التدوير.');
        // Reset form
        setDonorInfo({
          name: '',
          email: '',
          phone: '',
          address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
          }
        });
        setItemDescription({ title: '', description: '', category: '', condition: '' });
        setPickupInfo({ preferredDate: '', preferredTime: '', specialInstructions: '' });
        setImages([]);
      } else {
        setSubmitError(data.message || 'فشل في تقديم طلب التبرع. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setSubmitError('حدث خطأ أثناء تقديم طلب التبرع. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>طلبات التبرع - RecycleBay</title>
        <meta name="description" content="صفحة إدارة طلبات التبرع والأثاث المعروض للبيع." />
      </Helmet>
      {/* Hero Section with proper spacing from header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              طلبات التبرع
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              ساعد في إعادة تدوير الأثاث والأدوات المستعملة وكن جزءاً من مجتمع RecycleBay
            </motion.p>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen">
        <main className="container mx-auto px-4 py-8">
          {/* Donation Form Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-emerald-600 text-white p-6">
              <h2 className="text-2xl font-bold">قدم طلب تبرع جديد</h2>
              <p className="text-emerald-100 mt-1">املأ البيانات التالية لتقديم طلب تبرع</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {/* Donor Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center ml-3">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  معلومات المتبرع
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorName">
                      الاسم الكامل *
                    </label>
                    <input
                      id="donorName"
                      type="text"
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorEmail">
                      البريد الإلكتروني *
                    </label>
                    <input
                      id="donorEmail"
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorPhone">
                      رقم الهاتف *
                    </label>
                    <input
                      id="donorPhone"
                      type="tel"
                      value={donorInfo.phone}
                      onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="+966501234567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorStreet">
                      العنوان (الشارع)
                    </label>
                    <input
                      id="donorStreet"
                      type="text"
                      value={donorInfo.address.street}
                      onChange={(e) => setDonorInfo({
                        ...donorInfo,
                        address: { ...donorInfo.address, street: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="الشارع والرقم"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorCity">
                      المدينة
                    </label>
                    <input
                      id="donorCity"
                      type="text"
                      value={donorInfo.address.city}
                      onChange={(e) => setDonorInfo({
                        ...donorInfo,
                        address: { ...donorInfo.address, city: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="المدينة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorState">
                      المنطقة/الولاية
                    </label>
                    <input
                      id="donorState"
                      type="text"
                      value={donorInfo.address.state}
                      onChange={(e) => setDonorInfo({
                        ...donorInfo,
                        address: { ...donorInfo.address, state: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="المنطقة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorZipCode">
                      الرمز البريدي
                    </label>
                    <input
                      id="donorZipCode"
                      type="text"
                      value={donorInfo.address.zipCode}
                      onChange={(e) => setDonorInfo({
                        ...donorInfo,
                        address: { ...donorInfo.address, zipCode: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="donorCountry">
                      الدولة
                    </label>
                    <input
                      id="donorCountry"
                      type="text"
                      value={donorInfo.address.country}
                      onChange={(e) => setDonorInfo({
                        ...donorInfo,
                        address: { ...donorInfo.address, country: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="السعودية"
                    />
                  </div>
                </div>
              </div>
              {/* Item Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center ml-3">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  وصف القطعة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="itemTitle">
                      عنوان القطعة *
                    </label>
                    <input
                      id="itemTitle"
                      type="text"
                      value={itemDescription.title}
                      onChange={(e) => setItemDescription({ ...itemDescription, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="مثال: أريكة جلدية ثلاثة مقاعد"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="itemCategory">
                      الفئة *
                    </label>
                    <select
                      id="itemCategory"
                      value={itemDescription.category}
                      onChange={(e) => setItemDescription({ ...itemDescription, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                    >
                      <option value="">اختر الفئة</option>
                      <option value="furniture">أثاث</option>
                      <option value="electronics">إلكترونيات</option>
                      <option value="clothing">ملابس</option>
                      <option value="home-appliances">أدوات منزلية</option>
                      <option value="sports">رياضة</option>
                      <option value="books">كتب</option>
                      <option value="toys">ألعاب</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="itemCondition">
                      الحالة
                    </label>
                    <select
                      id="itemCondition"
                      value={itemDescription.condition}
                      onChange={(e) => setItemDescription({ ...itemDescription, condition: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                    >
                      <option value="new">جديد</option>
                      <option value="like-new">شبه جديد</option>
                      <option value="good">جيد</option>
                      <option value="fair">مقبول</option>
                      <option value="poor">سيء</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="itemDescription">
                      وصف مفصل *
                    </label>
                    <textarea
                      id="itemDescription"
                      value={itemDescription.description}
                      onChange={(e) => setItemDescription({ ...itemDescription, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
                      rows={4}
                      placeholder="وصف تفصيلي للقطعة، حالتها، الأبعاد، العلامة التجارية إن وجدت..."
                    />
                  </div>
                </div>
              </div>
              {/* Pickup Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center ml-3">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  معلومات الاستلام (اختياري)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pickupDate">
                      التاريخ المفضل للاستلام
                    </label>
                    <input
                      id="pickupDate"
                      type="date"
                      value={pickupInfo.preferredDate}
                      onChange={(e) => setPickupInfo({ ...pickupInfo, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="pickupTime">
                      الوقت المفضل للاستلام
                    </label>
                    <input
                      id="pickupTime"
                      type="time"
                      value={pickupInfo.preferredTime}
                      onChange={(e) => setPickupInfo({ ...pickupInfo, preferredTime: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="specialInstructions">
                      تعليمات خاصة
                    </label>
                    <textarea
                      id="specialInstructions"
                      value={pickupInfo.specialInstructions}
                      onChange={(e) => setPickupInfo({ ...pickupInfo, specialInstructions: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
                      rows={3}
                      placeholder="أي تعليمات خاصة لفريق الاستلام..."
                    />
                  </div>
                </div>
              </div>
              {/* Images Upload */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center ml-3">
                    <span className="text-emerald-600 font-bold">4</span>
                  </div>
                  صور القطعة
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اختر صوراً للقطعة (اختياري)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors bg-gray-50 hover:bg-emerald-50">
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="images"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <span className="text-emerald-600 font-medium mb-1">اضغط لاختيار الصور</span>
                      <p className="text-sm text-gray-500">يمكنك اختيار صور متعددة (PNG, JPG, JPEG) - حد أقصى 10 صور</p>
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">تم اختيار {images.length} صورة</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from(images).map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = Array.from(images);
                                newImages.splice(index, 1);
                                setImages(newImages);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800 text-sm">{submitError}</p>
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جاري الإرسال...
                    </div>
                  ) : (
                    'إرسال طلب التبرع'
                  )}
                </Button>
              </div>
            </form>
          </motion.section>


        </main>
      </div>
    </>
  );
};

export default DonationsPage;
