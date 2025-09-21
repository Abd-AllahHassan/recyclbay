import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, DollarSign, Leaf, Award, Clock, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: DollarSign,
      title: "أسعار رمزية",
      description: "للنقل والخدمات بأفضل الأسعار في السوق"
    },
    {
      icon: Leaf,
      title: "حماية البيئة",
      description: "مساهمة فعالة في تقليل النفايات والحفاظ على البيئة"
    },
    {
      icon: Award,
      title: "نموذج متكامل",
      description: "يجمع بين التجارة والمسؤولية الاجتماعية"
    },
    {
      icon: Shield,
      title: "علامة موثوقة",
      description: "علامة عصرية وموثوقة مدعومة برؤية واضحة"
    },
    {
      icon: Clock,
      title: "خدمة سريعة",
      description: "استجابة فورية وتسليم في الوقت المحدد"
    },
    {
      icon: CheckCircle,
      title: "ضمان الجودة",
      description: "نضمن جودة عالية في جميع خدماتنا"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-900 to-green-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            💡 لماذا RecycleBay؟
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            لماذا نحن <span className="text-emerald-300">الأفضل</span>؟
          </h2>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            نتميز بمجموعة من المزايا التي تجعلنا الخيار الأول لخدمات الأثاث المُجدد
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 card-hover"
            >
              <div className="w-12 h-12 bg-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <reason.icon className="w-6 h-6 text-emerald-900" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white">{reason.title}</h3>
              <p className="text-emerald-100 leading-relaxed">{reason.description}</p>
              
              <div className="mt-4 flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-400 ml-2" />
                <span className="text-sm text-emerald-200">متوفر الآن</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">جاهز للبدء؟</h3>
            <p className="text-emerald-100 mb-6">انضم إلى مئات العملاء الراضين واستمتع بخدماتنا المتميزة</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast({
                    title: "🚧 هذه الميزة غير مُفعلة بعد",
                    description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
                  });
                }}
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-all duration-300"
              >
                ابدأ الآن
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  toast({
                    title: "🚧 هذه الميزة غير مُفعلة بعد",
                    description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
                  });
                }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300"
              >
                تواصل معنا
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;