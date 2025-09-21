import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Wrench, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Truck,
      title: "خدمات النقل",
      description: "نقل الأثاث المنزلي المستعمل داخل أبوظبي بتكلفة مناسبة وخدمة احترافية",
      features: ["نقل آمن ومضمون", "فريق محترف", "أسعار تنافسية"],
      path: "/transport"
    },
    {
      icon: Wrench,
      title: "التجديد والصيانة",
      description: "تنظيف، طلاء، وإصلاح الأثاث لإعادته للحياة بأفضل حالة ممكنة",
      features: ["تنظيف شامل", "إصلاح متخصص", "طلاء عالي الجودة"],
      path: "/renovation"
    },
    {
      icon: RefreshCw,
      title: "إعادة الاستخدام",
      description: "بيع أو التبرع بالأثاث المُجدد لخدمة المجتمع وحماية البيئة",
      features: ["بيع بأسعار معقولة", "برامج تبرع", "ضمان الجودة"],
      path: "/reuse"
    },
    {
      icon: Home,
      title: "التأجير (مستقبلي)",
      description: "خيار تأجير الأثاث للطلاب والعمال لفترات قصيرة بمرونة كاملة",
      features: ["مرونة في المدة", "أسعار مناسبة", "خدمة شاملة"],
      path: "/rental"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🛋️ ما نقدمه
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            خدماتنا <span className="text-gradient">المتميزة</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجاتك في مجال الأثاث المُجدد
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-lg card-hover border border-emerald-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => navigate(service.path)}
                variant="outline"
                className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
              >
                اعرف المزيد
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;