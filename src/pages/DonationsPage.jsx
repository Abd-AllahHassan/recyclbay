
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import LocationMap from '@/components/LocationMap';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const storedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    setDonations(storedDonations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }, []);

  const handleDelete = (id) => {
    const updatedDonations = donations.filter(donation => donation.id !== id);
    setDonations(updatedDonations);
    localStorage.setItem('donations', JSON.stringify(updatedDonations));
  };

  return (
    <>
      <Helmet>
        <title>طلبات التبرع - RecycleBay</title>
        <meta name="description" content="صفحة إدارة طلبات التبرع والأثاث المعروض للبيع." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800">طلبات التبرع والبيع</h1>
            <p className="text-gray-600 mt-1">هنا يمكنك مراجعة جميع الطلبات المقدمة من المستخدمين.</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {donations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-lg shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-700">لا توجد طلبات حالياً</h2>
              <p className="text-gray-500 mt-2">عندما يقدم المستخدمون طلبات جديدة، ستظهر هنا.</p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {donations.map((donation, index) => (
                <motion.div
                  key={donation.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-emerald-600">{donation.name}</h3>
                        <p className="text-gray-500">{donation.phone}</p>
                        <p className="text-gray-500">{donation.emirate}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(donation.timestamp).toLocaleString('ar-AE')}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(donation.id)}>
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                    <p className="text-gray-700 mt-4">{donation.description}</p>
                    
                    {donation.images && donation.images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">الصور المرفقة:</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {donation.images.map((img, i) => (
                            <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                              <img src={img} alt={`Donation image ${i + 1}`} className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {donation.location && (
                       <div className="mt-6">
                         <h4 className="font-semibold text-gray-800 mb-2">موقع المتبرع:</h4>
                         <LocationMap location={donation.location} />
                       </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default DonationsPage;
