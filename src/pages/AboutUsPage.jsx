import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Target, Globe } from 'lucide-react';

const AboutUsPage = () => {
  const stats = [
    { value: '10,000+', label: 'قطعة أثاث تم إنقاذها' },
    { value: '5,000+', label: 'عميل سعيد' },
    { value: '150+', label: 'طن من النفايات تم تقليلها' },
  ];

  return (
    <>
      <Helmet>
        <title>من نحن - ريسيكل باي</title>
        <meta name="description" content="تعرف على قصة ريسيكل باي، مهمتنا لإعادة تعريف استدامة الأثاث، ورؤيتنا لمستقبل أكثر خضرة." />
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
              من نحن
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نحن أكثر من مجرد شركة أثاث. نحن حركة نحو مستقبل مستدام، قطعة بقطعة.
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
                className="w-full h-auto rounded-2xl shadow-lg object-cover"
                alt="ورشة عمل ريسيكل باي المشرقة مع حرفيين يعملون على تجديد الأثاث"
               src="https://images.unsplash.com/photo-1702565699599-e1afe79342d4" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10 text-center mb-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">قصتنا</h2>
                <p className="text-gray-600">تأسست ريسيكل باي من شغف بالتصميم وحب لكوكبنا. بدأنا كورشة عمل صغيرة، ونمت لتصبح منارة للاستدامة في صناعة الأثاث.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">مهمتنا</h2>
                <p className="text-gray-600">مهمتنا هي إعطاء حياة جديدة للأثاث القديم، وتقليل النفايات، وإلهام المستهلكين لاتخاذ خيارات واعية وصديقة للبيئة.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}>
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">رؤيتنا</h2>
                <p className="text-gray-600">نحن نتصور عالمًا حيث كل قطعة أثاث لها قصة، وحيث الاستدامة ليست خيارًا، بل أسلوب حياة.</p>
              </motion.div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
              <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">تأثيرنا بالأرقام</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <motion.div key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
                    <p className="text-4xl font-extrabold text-emerald-600">{stat.value}</p>
                    <p className="text-gray-500 mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;