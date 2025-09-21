import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Truck, Gift, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Hero = () => {
  const navigate = useNavigate();

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-right"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Gift className="w-4 h-4 ml-2" />
            أثاث مُجدد ومستدام
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">أثاث مُجدد</span>
            <br />
            <span className="text-gray-800">وأكثر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            نوفر خدمات نقل وتجديد بأسعار معقولة للأثاث المستعمل، مع خيارات الشراء أو التبرع.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={() => handleActionClick('/products')}
              size="lg"
              className="hero-gradient text-white px-6 py-3 rounded-full font-bold text-base hover:shadow-xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              تسوق الآن
            </Button>
            
            <Button
              onClick={() => handleActionClick('/contact')}
              variant="outline"
              size="lg"
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-full font-bold text-base transition-all duration-300"
            >
               <Gift className="w-5 h-5 ml-2" />
              تبرّع الآن
            </Button>

            <Button
              onClick={() => handleActionClick('/transport')}
              variant="outline"
              size="lg"
              className="border-2 border-gray-400 text-gray-600 hover:bg-gray-100 px-6 py-3 rounded-full font-bold text-base transition-all duration-300"
            >
               <Wrench className="w-5 h-5 ml-2" />
              اطلب التوصيل/التركيب
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-emerald-100"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-sm text-gray-600">قطعة أثاث مُجددة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">100+</div>
              <div className="text-sm text-gray-600">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">24/7</div>
              <div className="text-sm text-gray-600">خدمة العملاء</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative floating-animation">
            <img
              src="https://horizons-cdn.hostinger.com/f5871f83-294f-4937-97d7-0c25519a29be/5508324d442a9de3369a4c1f3fea9390.png"
              alt="RecycleBay - خدمات نقل وتجديد الأثاث المستعمل"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
            >
              <Truck className="w-8 h-8 text-emerald-500" />
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-emerald-500 rounded-full p-4 shadow-lg"
            >
              <Gift className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-3xl opacity-20 blur-xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;