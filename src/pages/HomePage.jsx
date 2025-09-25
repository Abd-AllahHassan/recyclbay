import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Mission from '@/components/Mission';
import WhyChooseUs from '@/components/WhyChooseUs';
import Shipping from '@/components/Shipping';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';
import SellWithUs from '@/components/SellWithUs';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>RecycleBay - ريسيكل باي | أثاث مُجدد ومستدام في أبوظبي</title>
        <meta name="description" content="RecycleBay وجهتك الأولى لشراء وبيع الأثاث المستعمل المجدد في أبوظبي. نقدم خدمات نقل، تجديد، وإعادة تدوير الأثاث للمساهمة في بيئة مستدامة. اكتشف قطع فريدة بأسعار معقولة." />
        <meta name="keywords" content="أثاث مستعمل أبوظبي, أثاث مجدد, شراء أثاث مستعمل, بيع أثاث مستعمل, ريسيكل باي, RecycleBay, تجديد أثاث, نقل أثاث, أثاث مستدام, إعادة تدوير الأثاث, أثاث رخيص, الإمارات, أبوظبي" />
        <meta property="og:title" content="RecycleBay - ريسيكل باي | وجهتك للأثاث المجدد والمستدام في أبوظبي" />
        <title>RecycleBay - ريسيكل باي | أثاث مُجدد ومستدام في أبوظبي</title>
        <meta property="og:description" content="نقدم خدمات نقل وتجديد الأثاث المستعمل في أبوظبي. اكتشف قطع فريدة وساهم في حماية البيئة مع ريسيكل باي." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Hero />
        <Mission />
        <FeaturedProducts />
        <SellWithUs />
        <div id="services">
          <Services />
        </div>
        <WhyChooseUs />
        <div id="about">
          <AboutSection />
        </div>
        <Shipping />
      </div>
    </>
  );
}

export default HomePage;