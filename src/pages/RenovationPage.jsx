import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Wrench, Brush, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const RenovationPage = () => {
  const services = [
    {
      icon: <Sparkles className="w-10 h-10 text-emerald-600" />,
      title: "تنظيف شامل",
      description: "نستخدم مواد تنظيف صديقة للبيئة لإزالة الأوساخ والبقع واستعادة بريق الأثاث الأصلي."
    },
    {
      icon: <Wrench className="w-10 h-10 text-emerald-600" />,
      title: "إصلاح متخصص",
      description: "يقوم حرفيونا بإصلاح أي كسور أو خدوش أو تلف في هيكل الأثاث لضمان متانته."
    },
    {
      icon: <Brush className="w-10 h-10 text-emerald-600" />,
      title: "طلاء وتشطيب",
      description: "نقدم خدمات طلاء عالية الجودة وتشطيبات متنوعة لإعطاء أثاثك مظهرًا جديدًا وعصريًا."
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
        <title>التجديد والصيانة - ريسيكل باي</title>
        <meta name="description" content="أعد الحياة لأثاثك القديم مع خدمات التجديد والصيانة من ريسيكل باي. تنظيف، إصلاح، وطلاء احترافي." />
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
              التجديد والصيانة
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              امنح أثاثك فرصة ثانية. خبرتنا في التجديد تعيد الجمال والقيمة لقطعتك المفضلة.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
             <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                  <img
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                    alt="صورة قبل وبعد لكرسي خشبي تم تجديده"
                   src="https://images.unsplash.com/photo-1525876531613-9faf57f566a6" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">من القديم إلى الجديد</h2>
                    <p className="text-gray-600 leading-relaxed">
                        في ريسيكل باي، نؤمن أن كل قطعة أثاث تملك قصة تستحق أن تُروى. من خلال عملية التجديد الدقيقة، نحول القطع البالية إلى تحف فنية مذهلة. نحن لا نصلح الأثاث فحسب، بل نعيد إحياء روحه.
                    </p>
                </motion.div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 text-center mb-20">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h2>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>

             <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white border border-emerald-200 rounded-2xl shadow-xl p-8 sm:p-12 text-center"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">هل لديك قطعة تحتاج إلى لمسة سحرية؟</h3>
              <p className="max-w-xl text-gray-600 mx-auto mb-8">
                تواصل معنا ودعنا نريك كيف يمكننا تحويل أثاثك القديم إلى قطعة مركزية جديدة في منزلك.
              </p>
              <Button onClick={handleRequestService} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                احصل على استشارة مجانية
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenovationPage;