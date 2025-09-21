import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { RefreshCw, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ReusePage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <ShoppingBag className="w-10 h-10 text-emerald-600" />,
      title: "شراء الأثاث المُجدد",
      description: "تصفح مجموعتنا المختارة من الأثاث عالي الجودة الذي تم تجديده بحب. كل قطعة فريدة وتضيف طابعًا خاصًا إلى منزلك.",
      buttonText: "تسوق الآن",
      action: () => navigate('/products')
    },
    {
      icon: <Heart className="w-10 h-10 text-emerald-600" />,
      title: "التبرع بأثاثك",
      description: "هل لديك أثاث لم تعد بحاجة إليه؟ تبرع به لنا وساهم في دعم المجتمع وتقليل النفايات. نحن نسهل عليك العملية.",
      buttonText: "تبرع الآن",
      action: () => navigate('/contact') // Assuming a contact page for donations
    }
  ];

  return (
    <>
      <Helmet>
        <title>إعادة الاستخدام - ريسيكل باي</title>
        <meta name="description" content="انضم إلى الاقتصاد الدائري عن طريق شراء الأثاث المجدد أو التبرع بأثاثك. ساهم في مستقبل أكثر استدامة." />
      </Helmet>
      <div className="bg-gray-50 py-20 sm:py-28" dir="rtl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
             <div className="inline-block bg-emerald-100 rounded-full p-4 mb-4">
                <RefreshCw className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
              إعادة الاستخدام: جوهر مهمتنا
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              إعادة استخدام الأثاث هي الطريقة الأكثر فعالية لتقليل التأثير البيئي. انضم إلينا في هذه الحركة.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center"
                >
                  <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h2>
                  <p className="text-gray-600 flex-grow mb-6">{section.description}</p>
                  <Button onClick={section.action} size="lg" className="bg-emerald-600 hover:bg-emerald-700 w-full">
                    {section.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <img
                className="w-full h-auto max-h-[400px] rounded-2xl shadow-lg object-cover"
                alt="رسم بياني يوضح فوائد إعادة استخدام الأثاث على البيئة"
               src="https://images.unsplash.com/photo-1608062326349-42beaf01e920" />
              <h3 className="text-3xl font-bold text-gray-800 mt-8 mb-4">لماذا إعادة الاستخدام؟</h3>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                كل قطعة أثاث يعاد استخدامها تعني موارد أقل تستهلك وطاقة أقل تهدر. إنها خطوة صغيرة تتخذها، ولكنها تحدث فرقًا كبيرًا لكوكبنا. باختيارك للأثاث المجدد، فإنك لا تحصل على قطعة فريدة فحسب، بل تصبح بطلاً للبيئة.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReusePage;