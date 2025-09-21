import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Mission from '@/components/Mission';
import WhyChooseUs from '@/components/WhyChooseUs';
import Shipping from '@/components/Shipping';
import FeaturedProducts from '@/components/FeaturedProducts';
import AboutSection from '@/components/AboutSection';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>RecycleBay - ريسيكل باي | أثاث مُجدد ومستدام في أبوظبي</title>
        <meta name="description" content="RecycleBay يقدم خدمات نقل وتجديد الأثاث المستعمل في أبوظبي. نساهم في حماية البيئة من خلال إعادة تدوير الأثاث وتوفير حلول مستدامة وبأسعار معقولة." />
        <meta name="keywords" content="أثاث مستعمل, تجديد أثاث, نقل أثاث, أبوظبي, إعادة تدوير, أثاث مُجدد, خدمات نقل" />
        <meta property="og:title" content="RecycleBay - ريسيكل باي | أثاث مُجدد ومستدام" />
        <meta property="og:description" content="نقدم خدمات نقل وتجديد الأثاث المستعمل في أبوظبي مع المساهمة في حماية البيئة" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Helmet>
      
      <Hero />
      <Mission />
      <FeaturedProducts />
      <div id="services">
        <Services />
      </div>
      <WhyChooseUs />
      <div id="about">
       <AboutSection />
      </div>
      <Shipping />
    </>
  );
}

export default HomePage;