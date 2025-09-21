import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Heart, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate();
  const handleSocialClick = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀"
    });
  };
  const handleLinkClick = path => {
    if (path) {
      navigate(path);
    } else {
      toast({
        title: "🚧 هذه الميزة غير مُفعلة بعد",
        description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀"
      });
    }
  };
  const footerLinks = {
    services: [{
      name: "خدمات النقل",
      path: "/transport"
    }, {
      name: "التجديد والصيانة",
      path: "/renovation"
    }, {
      name: "إعادة الاستخدام",
      path: "/reuse"
    }, {
      name: "التأجير",
      path: "/rental"
    }],
    company: [{
      name: "من نحن",
      path: "/about"
    }, {
      name: "رسالتنا",
      path: "/mission"
    }, {
      name: "فريق العمل",
      path: "/team"
    }, {
      name: "الوظائف",
      path: "/careers"
    }],
    support: [{
      name: "مركز المساعدة",
      path: "/help"
    }, {
      name: "الأسئلة الشائعة",
      path: "/faq"
    }, {
      name: "سياسة الخصوصية",
      path: "/privacy"
    }, {
      name: "الشروط والأحكام",
      path: "/terms"
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    name: "فيسبوك"
  }, {
    icon: Instagram,
    name: "إنستغرام"
  }, {
    icon: Twitter,
    name: "تويتر"
  }, {
    icon: Linkedin,
    name: "لينكد إن"
  }];
  return <footer className="bg-gradient-to-br from-gray-900 to-emerald-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">RecycleBay</span>
                <p className="text-emerald-300 text-sm">ريسيكل باي</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">"نحو مستقبل أكثر استدامة، نعيد للأثاث حياة جديدة ونحوّله إلى فرصة ملهمة تعكس التزامنا بالبيئة والمجتمع. من خلال إعادة التدوير وتقديم حلول مبتكرة صديقة للبيئة، نصنع فرقًا حقيقيًا ونبني مع عملائنا عالمًا أكثر وعيًا ومسؤولية."</p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => <motion.button key={index} onClick={handleSocialClick} whileHover={{
              scale: 1.1
            }} whileTap={{
              scale: 0.9
            }} className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                  <social.icon className="w-5 h-5" />
                </motion.button>)}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} viewport={{
          once: true
        }}>
            <span className="text-lg font-bold text-white mb-6 block">خدماتنا</span>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => <li key={index}>
                  <button onClick={() => handleLinkClick(link.path)} className="text-gray-300 hover:text-emerald-300 transition-colors text-right block w-full">
                    {link.name}
                  </button>
                </li>)}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }}>
            <span className="text-lg font-bold text-white mb-6 block">الشركة</span>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => <li key={index}>
                  <button onClick={() => handleLinkClick(link.path)} className="text-gray-300 hover:text-emerald-300 transition-colors text-right block w-full">
                    {link.name}
                  </button>
                </li>)}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }}>
            <span className="text-lg font-bold text-white mb-6 block">الدعم</span>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => <li key={index}>
                  <button onClick={() => handleLinkClick(link.path)} className="text-gray-300 hover:text-emerald-300 transition-colors text-right block w-full">
                    {link.name}
                  </button>
                </li>)}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} viewport={{
        once: true
      }} className="border-t border-emerald-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 RecycleBay. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              إحدى مبادرات شركة أوتوبيس إنترناشيونال للتجارة
            </p>
            <div className="flex items-center text-gray-300 text-sm">
              <span>صُنع بـ</span>
              <Heart className="w-4 h-4 text-red-400 mx-1" />
              <span>في أبوظبي</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;