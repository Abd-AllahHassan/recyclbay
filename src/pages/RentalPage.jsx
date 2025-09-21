import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Home, Calendar, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const RentalPage = () => {
  const benefits = [
    {
      icon: <Wallet className="w-10 h-10 text-emerald-600" />,
      title: "حلول مرنة وميسورة التكلفة",
      description: "احصل على أثاث أنيق وعالي الجودة دون الالتزام بالشراء. مثالي للإقامات المؤقتة والمشاريع قصيرة الأجل."
    },
    {
      icon: <Calendar className="w-10 h-10 text-emerald-600" />,
      title: "مثالي للطلاب والعمال",
      description: "إذا كنت في أبوظبي لفترة محدودة للدراسة أو العمل، فإن خدمة التأجير لدينا توفر لك كل ما تحتاجه لفرش منزلك بسهولة."
    },
    {
      icon: <Home className="w-10 h-10 text-emerald-600" />,
      title: "جرب قبل أن تشتري",
      description: "هل أنت غير متأكد من قطعة معينة؟ قم بتأجيرها لفترة لترى كيف تتناسب مع مساحتك وأسلوب حياتك."
    }
  ];

  const handleInquiry = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "الخدمة قيد التطوير حاليًا. ترقبوا التحديثات! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>تأجير الأثاث (مستقبلي) - ريسيكل باي</title>
        <meta name="description" content="اكتشف خدمة تأجير الأثاث المرنة والميسورة التكلفة من ريسيكل باي، الحل الأمثل للإقامات المؤقتة في أبوظبي." />
      </Helmet>
      <div className="bg-gray-50 py-20 sm:py-28" dir="rtl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-amber-200 text-amber-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">قريباً</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
              خدمة تأجير الأثاث
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نعمل على توفير حلول تأجير مرنة لتلبية احتياجاتك المؤقتة. الأناقة والاستدامة، دون التزام طويل الأمد.
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
                alt="غرفة معيشة مؤثثة بأناقة مع أثاث مستأجر من ريسيكل باي"
               src="https://images.unsplash.com/photo-1638972691611-69633a3d3127" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 text-center mb-20">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                   className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{benefit.title}</h2>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-xl p-8 sm:p-12 text-center"
            >
              <h3 className="text-3xl font-bold mb-4">مهتم بخدمة التأجير؟</h3>
              <p className="max-w-xl mx-auto mb-8 text-gray-300">
                هذه الخدمة قيد التطوير حاليًا. سجل اهتمامك لتكون أول من يعرف عند إطلاقها!
              </p>
              <Button onClick={handleInquiry} size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
                سجل اهتمامي
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default RentalPage;