import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const handleContactClick = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "الموقع",
      info: "أبوظبي – الإمارات العربية المتحدة",
      subInfo: "نخدم جميع مناطق أبوظبي"
    },
    {
      icon: Phone,
      title: "رقم الهاتف",
      info: "[تضيف رقمك]",
      subInfo: "متاح 24/7 لخدمتك"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      info: "info@recyclebay.store",
      subInfo: "نرد خلال ساعات قليلة"
    },
    {
      icon: Globe,
      title: "الموقع الإلكتروني",
      info: "[رابط المتجر على هوستنجر]",
      subInfo: "تسوق أونلاين بسهولة"
    }
  ];

  const workingHours = [
    { day: "السبت - الخميس", hours: "8:00 ص - 8:00 م" },
    { day: "الجمعة", hours: "2:00 م - 8:00 م" },
    { day: "الطوارئ", hours: "24/7 متاح" }
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
            📞 تواصل معنا
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            نحن هنا <span className="text-gradient">لخدمتك</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تواصل معنا في أي وقت وسنكون سعداء لمساعدتك في جميع احتياجاتك
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100 card-hover"
                >
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-emerald-600 font-medium mb-1">{item.info}</p>
                      <p className="text-gray-500 text-sm">{item.subInfo}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">تواصل سريع</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Button
                  onClick={handleContactClick}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 py-4 rounded-xl font-bold text-lg"
                >
                  <Phone className="w-5 h-5 ml-2" />
                  اتصل بنا
                </Button>
                <Button
                  onClick={handleContactClick}
                  className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-emerald-600 py-4 rounded-xl font-bold text-lg"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  واتساب
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100"
            >
              <div className="flex items-center mb-6">
                <Clock className="w-6 h-6 text-emerald-500 ml-3" />
                <h3 className="text-xl font-bold text-gray-800">ساعات العمل</h3>
              </div>
              <div className="space-y-4">
                {workingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-emerald-50 last:border-b-0">
                    <span className="text-gray-600 font-medium">{item.day}</span>
                    <span className="text-emerald-600 font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 text-center"
                >
                    <div className="p-2 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl shadow-inner-lg">
                        <img
                            src="https://horizons-cdn.hostinger.com/f5871f83-294f-4937-97d7-0c25519a29be/e9b4352e4d3f431b131cc12cb5ebeedf.png"
                            alt="RecycleBay Logo - ريسيكل باي"
                            className="w-full h-auto max-w-xs mx-auto rounded-lg"
                        />
                    </div>
                    <div className="mt-4">
                        <h4 className="text-lg font-bold text-gray-800">RecycleBay</h4>
                        <p className="text-emerald-600 font-medium">ريسيكل باي</p>
                        <p className="text-gray-500 text-sm mt-2">أثاث مُجدد ومستدام</p>
                    </div>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;