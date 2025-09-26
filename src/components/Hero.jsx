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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src="https://videos.pexels.com/video-files/854192/854192-sd_640_360_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8"
          >
            <Gift className="w-5 h-5 ml-2" />
            أثاث مُجدد ومستدام
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
          >
            <span className="text-blue-400">أثاث مُجدد</span>
            <br />
            <span className="text-white">وأكثر</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto"
          >
            نوفر خدمات نقل وتجديد بأسعار معقولة للأثاث المستعمل، مع خيارات الشراء أو التبرع.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <Button
              onClick={() => handleActionClick('/products')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <ShoppingCart className="w-6 h-6 ml-2 group-hover:scale-110 transition-transform" />
              تسوق الآن
            </Button>

            <Button
              onClick={() => handleActionClick('/donations')}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
               <Gift className="w-6 h-6 ml-2" />
              تبرّع الآن
            </Button>

            <Button
              onClick={() => handleActionClick('/transport')}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-200 hover:bg-gray-300 hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            >
               <Wrench className="w-6 h-6 ml-2" />
              اطلب التوصيل/التركيب
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-12 mt-16 pt-8 border-t border-white/30"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-300">قطعة أثاث مُجددة</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-300">عميل راضٍ</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">خدمة العملاء</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;