import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const TransportPage = () => {
  const features = [
    {
      icon: <Truck className="w-10 h-10 text-emerald-600" />,
      title: "فريق محترف",
      description: "فريقنا مدرب على التعامل مع جميع أنواع الأثاث بعناية فائقة لضمان وصوله بأمان."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />,
      title: "نقل آمن ومؤمن",
      description: "نستخدم أفضل مواد التغليف وأحدث التقنيات لضمان حماية أثاثك أثناء النقل."
    },
    {
      icon: <Star className="w-10 h-10 text-emerald-600" />,
      title: "أسعار تنافسية",
      description: "نقدم خدمة عالية الجودة بأسعار معقولة ومناسبة لجميع عملائنا في أبوظبي."
    }
  ];

  const handleRequestService = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>خدمات النقل - ريسيكل باي</title>
        <meta name="description" content="خدمات نقل أثاث احترافية وآمنة داخل أبوظبي. اعتمد على ريسيكل باي لنقل أثاثك بسهولة وأمان." />
      </Helmet>
      <div className="bg-gray-50 py-20 sm:py-28" dir="rtl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
              خدمات نقل الأثاث
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقل آمن، سريع، وموثوق لأثاثك المستعمل داخل أبوظبي. دعنا نهتم بالتفاصيل.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative mb-16"
            >
              <img
                className="w-full h-auto max-h-[450px] rounded-2xl shadow-lg object-cover"
                alt="شاحنة نقل تابعة لـ ريسيكل باي متوقفة أمام مبنى سكني حديث"
               src="https://images.unsplash.com/photo-1702344560559-1d77106df3d5" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 text-center mb-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h2>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl shadow-xl p-8 sm:p-12 text-center"
            >
              <h3 className="text-3xl font-bold mb-4">هل أنت جاهز لنقل أثاثك؟</h3>
              <p className="max-w-xl mx-auto mb-8">
                تواصل معنا اليوم للحصول على عرض سعر مجاني ودع فريقنا المحترف يتولى مهمة النقل بكل سهولة ويسر.
              </p>
              <Button onClick={handleRequestService} size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-bold">
                اطلب الخدمة الآن
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransportPage;