import React from 'react';
    import { Helmet } from 'react-helmet-async';
    import { motion } from 'framer-motion';
    import { ShieldCheck, FileText, Gavel } from 'lucide-react';

    const TermsAndConditionsPage = () => {
      const sections = [
        {
          icon: <FileText className="w-8 h-8 text-emerald-500" />,
          title: "1. مقدمة",
          content: "مرحبًا بك في ريسيكل باي. تحدد هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام موقعنا الإلكتروني. من خلال الوصول إلى هذا الموقع، نفترض أنك تقبل هذه الشروط والأحكام. لا تواصل استخدام ريسيكل باي إذا كنت لا توافق على جميع الشروط والأحكام المذكورة في هذه الصفحة."
        },
        {
          icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
          title: "2. الترخيص",
          content: "ما لم ينص على خلاف ذلك، تمتلك ريسيكل باي و/أو مرخصوها حقوق الملكية الفكرية لجميع المواد الموجودة على ريسيكل باي. جميع حقوق الملكية الفكرية محفوظة. يمكنك الوصول إلى هذا من ريسيكل باي للاستخدام الشخصي الخاص بك مع مراعاة القيود المنصوص عليها في هذه الشروط والأحكام."
        },
        {
          icon: <Gavel className="w-8 h-8 text-emerald-500" />,
          title: "3. سلوك المستخدم",
          content: "يجب ألا تستخدم هذا الموقع بأي طريقة تسبب أو قد تسبب ضررًا للموقع أو إضعاف توافر أو إمكانية الوصول إلى ريسيكل باي أو بأي طريقة غير قانونية أو احتيالية أو ضارة، أو فيما يتعلق بأي غرض أو نشاط غير قانوني أو احتيالي أو ضار."
        },
        {
            title: "4. المنتجات والخدمات",
            content: "جميع المنتجات المعروضة على الموقع تخضع للتوافر. نحن نحتفظ بالحق في تقييد كميات أي منتجات أو خدمات نقدمها. جميع أوصاف المنتجات أو أسعار المنتجات عرضة للتغيير في أي وقت دون إشعار، حسب تقديرنا الخاص."
        },
        {
            title: "5. تحديد المسؤولية",
            content: "لن تتحمل ريسيكل باي، ولا أي من مسؤوليها ومديريها وموظفيها، بأي حال من الأحوال المسؤولية عن أي شيء ينشأ عن أو يرتبط بأي شكل من الأشكال باستخدامك لهذا الموقع سواء كانت هذه المسؤولية بموجب عقد. لن تتحمل ريسيكل باي، بما في ذلك مسؤوليها ومديريها وموظفيها، المسؤولية عن أي مسؤولية غير مباشرة أو تبعية أو خاصة تنشأ عن أو ترتبط بأي شكل من الأشكال باستخدامك لهذا الموقع."
        },
        {
            title: "6. القانون الحاكم والاختصاص القضائي",
            content: "تخضع هذه الشروط وتفسر وفقًا لقوانين دولة الإمارات العربية المتحدة، وتخضع أنت للاختصاص القضائي غير الحصري للمحاكم الحكومية والفدرالية الموجودة في أبوظبي لحل أي نزاعات."
        }
      ];

      return (
        <>
          <Helmet>
            <title>الشروط والأحكام - ريسيكل باي</title>
            <meta name="description" content="اقرأ الشروط والأحكام الخاصة باستخدام موقع وخدمات ريسيكل باي." />
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
                  الشروط والأحكام
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  آخر تحديث: 14 سبتمبر 2025. يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                <div className="space-y-10">
                  {sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col sm:flex-row items-start gap-6"
                    >
                      {section.icon && (
                        <div className="flex-shrink-0 bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center">
                          {section.icon}
                        </div>
                      )}
                      <div className={!section.icon ? 'w-full' : 'flex-grow'}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{section.title}</h2>
                        <p className="text-gray-600 leading-relaxed">{section.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

    export default TermsAndConditionsPage;