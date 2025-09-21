import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wrench, Truck, Recycle, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon, title, description, link, delay, navigate }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group p-8 text-right"
    >
      <div className="flex justify-end mb-4">
        <div className="bg-emerald-100 p-4 rounded-full group-hover:bg-emerald-500 transition-colors duration-300">
          <IconComponent className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow mb-6">{description}</p>
      <Button
        onClick={() => navigate(link)}
        variant="ghost"
        className="self-end text-emerald-600 font-bold group-hover:text-emerald-800 transition-colors"
      >
        اعرف المزيد <ArrowLeft className="w-4 h-4 mr-2" />
      </Button>
    </motion.div>
  );
};

const ServicesPage = () => {
    const navigate = useNavigate();

  const services = [
    {
      icon: Wrench,
      title: 'التجديد والصيانة',
      description: 'نمنح أثاثك حياة جديدة من خلال خدمات التجديد والصيانة الاحترافية التي تعيد له رونقه وقيمته.',
      link: '/renovation',
    },
    {
      icon: Truck,
      title: 'خدمات النقل',
      description: 'نقدم حلول نقل آمنة وفعالة لأثاثك، مع فريق متخصص يضمن وصوله بحالته الأصلية.',
      link: '/transport',
    },
    {
      icon: Recycle,
      title: 'إعادة الاستخدام',
      description: 'نساهم في الحفاظ على البيئة من خلال إعادة استخدام الأثاث وتدويره بأساليب مبتكرة ومستدامة.',
      link: '/reuse',
    },
    {
      icon: Calendar,
      title: 'التأجير',
      description: 'نوفر خيارات تأجير مرنة للأثاث تناسب احتياجاتك المؤقتة، سواء للمناسبات أو للمساكن قصيرة الأجل.',
      link: '/rental',
    },
  ];

  return (
    <>
      <Helmet>
        <title>خدماتنا - ريسيكل باي</title>
        <meta name="description" content="اكتشف مجموعة خدماتنا المتكاملة في ريسيكل باي، من تجديد وصيانة الأثاث إلى النقل وإعادة الاستخدام والتأجير." />
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
              خدماتنا المتكاملة
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نحن نقدم حلولاً شاملة ومستدامة للأثاث، مصممة لتلبية كافة احتياجاتك مع الحفاظ على البيئة.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
                delay={0.1 * (index + 1)}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;