
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Truck, CheckCircle } from 'lucide-react';

const Shipping = () => {
  const steps = [
    {
      icon: <Phone className="w-10 h-10 text-emerald-600" />,
      title: 'طلب الخدمة',
      description: 'تواصل معنا وحدد احتياجاتك',
    },
    {
      icon: <Calendar className="w-10 h-10 text-emerald-600" />,
      title: 'تحديد الموعد',
      description: 'نحدد موعد مناسب للنقل',
    },
    {
      icon: <Truck className="w-10 h-10 text-emerald-600" />,
      title: 'النقل الآمن',
      description: 'فريقنا ينقل الأثاث بعناية',
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-emerald-600" />,
      title: 'التسليم',
      description: 'تسلم الأثاث في المكان المحدد',
    },
  ];

  return (
    <section className="py-20 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            عملية التوصيل
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نضمن لك تجربة توصيل سلسة وموثوقة لأثاثك.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-y-0 right-0 w-full flex items-center justify-center">
            <div className="h-1 bg-emerald-200 w-full absolute top-1/2 -translate-y-1/2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center"
              >
                <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-emerald-600 mb-2">{index + 1}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
