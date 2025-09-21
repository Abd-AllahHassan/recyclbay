import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Recycle, Heart, Leaf } from 'lucide-react';

const MissionPage = () => {
  const principles = [
    {
      icon: <Recycle className="w-10 h-10 text-white" />,
      title: "تقليل النفايات",
      description: "نحن نحول الأثاث غير المرغوب فيه من مكبات النفايات ونمنحه فرصة ثانية للحياة، مما يقلل بشكل كبير من بصمتنا البيئية."
    },
    {
      icon: <Heart className="w-10 h-10 text-white" />,
      title: "تعزيز الحرفية",
      description: "يقوم فريقنا من الحرفيين المهرة بإصلاح وتجديد كل قطعة بحب وعناية، محافظين على جودتها وقصتها الفريدة."
    },
    {
      icon: <Leaf className="w-10 h-10 text-white" />,
      title: "إلهام الاستدامة",
      description: "نهدف إلى تثقيف وإلهام مجتمعنا حول فوائد الاقتصاد الدائري، وتشجيع خيارات أكثر وعيًا للمستهلكين."
    }
  ];

  return (
    <>
      <Helmet>
        <title>رسالتنا - ريسيكل باي</title>
        <meta name="description" content="اكتشف رسالة ريسيكل باي: تقليل النفايات، تعزيز الحرفية، وإلهام الاستدامة من خلال إعادة تدوير الأثاث." />
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
              رسالتنا: إعادة تعريف قيمة الأثاث
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              في ريسيكل باي، نحن مدفوعون بهدف واضح: بناء مستقبل أكثر استدامة من خلال تغيير الطريقة التي نفكر بها في الأثاث.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                    {principle.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{principle.title}</h2>
                  <p className="leading-relaxed">{principle.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-20 bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">التزامنا بالجودة</h3>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                الاستدامة لا تعني التنازل عن الجودة. كل قطعة تمر بعملية فحص وتجديد صارمة لضمان أنها لا تبدو رائعة فحسب، بل تدوم لسنوات قادمة. نحن نؤمن بأن الأثاث المستدام يجب أن يكون جميلاً وعملياً ومتاحاً للجميع.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionPage;