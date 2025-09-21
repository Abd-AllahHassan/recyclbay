import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            تعرف علينا <span className="text-gradient">أكثر</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن حركة نحو مستقبل مستدام، قطعة بقطعة.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">قصتنا</h3>
                <p className="text-gray-600">تأسسنا من شغف بالتصميم وحب لكوكبنا، ونمونا لنصبح منارة للاستدامة.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">مهمتنا</h3>
                <p className="text-gray-600">مهمتنا هي إعطاء حياة جديدة للأثاث، وتقليل النفايات، وإلهام خيارات واعية.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">رؤيتنا</h3>
                <p className="text-gray-600">نتصور عالمًا حيث الاستدامة ليست خيارًا، بل أسلوب حياة متكامل.</p>
            </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button onClick={() => navigate('/about')} size="lg" className="hero-gradient text-white font-bold">
            اكتشف المزيد عنا
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;