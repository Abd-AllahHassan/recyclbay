import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Truck, Wrench } from 'lucide-react';
const Mission = () => {
  const missions = [{
    icon: <Recycle className="w-10 h-10 text-emerald-500" />,
    title: 'تقليل النفايات',
    description: 'إنقاذ الأثاث القابل للتجديد من مكبات النفايات وإعادة الحياة إليه.'
  }, {
    icon: <Truck className="w-10 h-10 text-emerald-500" />,
    title: 'حلول بأسعار معقولة',
    description: 'تقديم خدمات نقل وصيانة احترافية بتكاليف رمزية ومناسبة للجميع.'
  }, {
    icon: <Wrench className="w-10 h-10 text-emerald-500" />,
    title: 'دعم المجتمع المحلي',
    description: 'توفير أثاث مُجدد وعالي الجودة للأسر والطلاب والعمال في أبوظبي.'
  }];
  return <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎯 رسالتنا
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            نحو مستقبل أكثر <span className="text-gradient">استدامة</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">"نحن نؤمن بأن لكل قطعة أثاث حياة ثانية تستحق أن تُعاش، فنعيد تدويرها بعناية لنحوّلها من مجرد غرض منزلي إلى قصة جديدة تربط بين الإنسان وبيئته. رسالتنا أن نبني جسرًا متينًا بين الاستدامة والمجتمع، حيث يصبح كل اختيار واعٍ خطوة نحو عالم أكثر جمالًا ومسؤولية."</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {missions.map((mission, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: index * 0.2
        }} viewport={{
          once: true
        }} className="text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 card-hover">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  {mission.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{mission.title}</h3>
              <p className="text-gray-600 leading-relaxed">{mission.description}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Mission;