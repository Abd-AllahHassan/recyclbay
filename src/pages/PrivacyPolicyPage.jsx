import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Lock, User, Cookie } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: <Lock className="w-8 h-8 text-emerald-500" />,
      title: "1. مقدمة",
      content: "في ريسيكل باي، خصوصية زوارنا هي أولوية قصوى بالنسبة لنا. توضح وثيقة سياسة الخصوصية هذه أنواع المعلومات التي يتم جمعها وتسجيلها بواسطة ريسيكل باي وكيف نستخدمها."
    },
    {
      icon: <User className="w-8 h-8 text-emerald-500" />,
      title: "2. جمع المعلومات",
      content: "نقوم بجمع معلومات شخصية تحدد هويتك (مثل الاسم، البريد الإلكتروني، رقم الهاتف) عندما تقوم بالتسجيل في موقعنا، أو تطلب منتجًا، أو تشترك في نشرتنا الإخبارية، أو تملأ نموذجًا. يتم جمع هذه المعلومات فقط بموافقتك الصريحة."
    },
    {
      icon: <Cookie className="w-8 h-8 text-emerald-500" />,
      title: "3. ملفات تعريف الارتباط (الكوكيز)",
      content: "يستخدم ريسيكل باي ملفات تعريف الارتباط لتخزين معلومات حول تفضيلات الزوار، وعلى الصفحات التي قام الزائر بالوصول إليها أو زيارتها. يتم استخدام المعلومات لتحسين تجربة المستخدم من خلال تخصيص محتوى صفحة الويب الخاصة بنا بناءً على نوع متصفح الزوار و/أو معلومات أخرى."
    },
    {
        title: "4. استخدام المعلومات",
        content: "نستخدم المعلومات التي نجمعها بطرق مختلفة، بما في ذلك: تشغيل وصيانة موقعنا الإلكتروني، تحسين وتخصيص وتوسيع موقعنا الإلكتروني، فهم وتحليل كيفية استخدامك لموقعنا الإلكتروني، تطوير منتجات وخدمات وميزات ووظائف جديدة، التواصل معك، وإرسال رسائل بريد إلكتروني إليك، ومنع الاحتيال."
    },
    {
        title: "5. مشاركة المعلومات",
        content: "نحن لا نبيع أو نتاجر أو ننقل معلوماتك الشخصية إلى أطراف خارجية. هذا لا يشمل الأطراف الثالثة الموثوقة التي تساعدنا في تشغيل موقعنا الإلكتروني، أو إدارة أعمالنا، أو خدمتك، طالما وافقت هذه الأطراف على الحفاظ على سرية هذه المعلومات."
    },
    {
        title: "6. حقوق حماية البيانات",
        content: "نود التأكد من أنك على دراية كاملة بجميع حقوق حماية البيانات الخاصة بك. يحق لكل مستخدم ما يلي: الحق في الوصول، الحق في التصحيح، الحق في المسح، الحق في تقييد المعالجة، الحق في الاعتراض على المعالجة، والحق في نقل البيانات."
    }
  ];

  return (
    <>
      <Helmet>
        <title>سياسة الخصوصية - ريسيكل باي</title>
        <meta name="description" content="اقرأ سياسة الخصوصية الخاصة بموقع وخدمات ريسيكل باي." />
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
              سياسة الخصوصية
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              آخر تحديث: 14 سبتمبر 2025. يرجى قراءة هذه السياسة بعناية لفهم كيفية جمعنا واستخدامنا لبياناتك.
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

export default PrivacyPolicyPage;