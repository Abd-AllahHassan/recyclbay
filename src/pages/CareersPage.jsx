import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "حرفي أثاث",
      location: "أبوظبي، الإمارات العربية المتحدة",
      type: "دوام كامل",
      description: "نبحث عن حرفي ماهر لديه شغف بالعمل مع الخشب وتجديد الأثاث. يجب أن يكون لديك خبرة في النجارة والتشطيب."
    },
    {
      title: "أخصائي تسويق رقمي",
      location: "العمل عن بعد",
      type: "دوام كامل",
      description: "انضم إلى فريقنا لتنمية حضورنا عبر الإنترنت. مسؤول عن إدارة وسائل التواصل الاجتماعي، وحملات البريد الإلكتروني، وتحسين محركات البحث."
    },
    {
      title: "ممثل خدمة العملاء",
      location: "أبوظبي، الإمارات العربية المتحدة",
      type: "دوام جزئي",
      description: "كن وجه ريسيكل باي! ساعد عملائنا في استفساراتهم وقدم لهم تجربة تسوق استثنائية."
    }
  ];

  const handleApplyClick = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>الوظائف - ريسيكل باي</title>
        <meta name="description" content="انضم إلى فريق ريسيكل باي وكن جزءًا من مهمتنا لإحداث تأثير إيجابي. تصفح الوظائف الشاغرة لدينا." />
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
              انضم إلى فريقنا
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              كن جزءًا من مهمتنا لإعادة تشكيل مستقبل الأثاث. نحن نبحث دائمًا عن أفراد موهوبين ومتحمسين.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">{job.title}</h2>
                  <Button onClick={handleApplyClick} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    قدم الآن
                  </Button>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </motion.div>
            ))}
             <div className="text-center pt-8">
                <p className="text-gray-600">لا ترى وظيفة مناسبة؟ أرسل لنا سيرتك الذاتية على <a href="mailto:careers@recyclebay.com" className="text-emerald-600 font-bold hover:underline">careers@recyclebay.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;