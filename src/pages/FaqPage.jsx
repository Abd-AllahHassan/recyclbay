import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage = () => {
  const faqs = [
    {
      question: "ما هي أنواع الأثاث التي تقبلونها؟",
      answer: "نحن نقبل مجموعة واسعة من الأثاث الخشبي والمعدني والمنجد. يجب أن تكون القطع في حالة هيكلية سليمة. لا نقبل الأثاث المكسور بشدة أو الملوث."
    },
    {
      question: "كيف تعمل عملية التبرع بالأثاث؟",
      answer: "الأمر بسيط! املأ نموذج التبرع على موقعنا مع صور لقطعتك. سنقوم بمراجعتها، وإذا كانت مناسبة، سنتواصل معك لترتيب عملية استلام مجانية."
    },
    {
      question: "هل تبيعون الأثاث المجدد؟",
      answer: "نعم! يمكنك تصفح مجموعتنا من الأثاث المجدد بشكل جميل في قسم 'المنتجات' لدينا. كل قطعة فريدة من نوعها ولها قصة."
    },
    {
      question: "ماذا يحدث للأثاث الذي لا يمكن تجديده؟",
      answer: "نسعى جاهدين لإعادة استخدام كل جزء. إذا كانت القطعة غير قابلة للإصلاح، فإننا نقوم بتفكيكها بعناية لإعادة تدوير المواد مثل الخشب والمعدن والنسيج."
    },
    {
      question: "هل تقدمون خدمات التوصيل؟",
      answer: "نعم، نحن نقدم خدمات التوصيل للمنتجات المشتراة. تختلف رسوم التوصيل حسب موقعك وحجم الطلب. يمكنك رؤية خيارات الشحن عند الدفع."
    }
  ];

  return (
    <>
      <Helmet>
        <title>الأسئلة الشائعة - ريسيكل باي</title>
        <meta name="description" content="ابحث عن إجابات للأسئلة الشائعة حول خدمات ريسيكل باي، التبرع بالأثاث، وعملية التجديد." />
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
              الأسئلة الشائعة
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              لديك أسئلة؟ لدينا إجابات. ابحث عن ما تحتاجه هنا.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`} className="bg-white rounded-xl shadow-md border-b-0">
                    <AccordionTrigger className="p-6 text-lg font-semibold text-right hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;