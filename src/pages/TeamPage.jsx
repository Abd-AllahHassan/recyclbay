import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "علياء المنصوري",
      role: "المؤسس والرئيس التنفيذي",
      bio: "علياء هي القوة الدافعة وراء ريسيكل باي، بشغفها بالاستدامة والتصميم.",
      imageText: "صورة علياء المنصوري، امرأة مبتسمة في منتصف العمر ترتدي ملابس عمل غير رسمية"
    },
    {
      name: "خالد الشامسي",
      role: "رئيس قسم العمليات",
      bio: "خالد يضمن أن كل قطعة أثاث تمر بعملية تجديد سلسة وفعالة.",
      imageText: "صورة خالد الشامسي، رجل واثق يرتدي قميصًا أزرق"
    },
    {
      name: "فاطمة النعيمي",
      role: "مديرة التصميم",
      bio: "فاطمة تبث حياة جديدة في كل قطعة، بمزج الأساليب الكلاسيكية مع لمسة عصرية.",
      imageText: "صورة فاطمة النعيمي، مصممة مبدعة في ورشة عملها"
    },
    {
      name: "حسن الحمادي",
      role: "رئيس الحرفيين",
      bio: "بخبرة عقود، يقود حسن فريق الحرفيين المهرة لدينا بشغف ودقة.",
      imageText: "صورة حسن الحمادي، حرفي خبير يعمل على قطعة أثاث خشبية"
    },
  ];

  return (
    <>
      <Helmet>
        <title>فريق العمل - ريسيكل باي</title>
        <meta name="description" content="تعرف على الفريق الشغوف في ريسيكل باي الذي يعمل بجد لإحداث فرق في عالم الأثاث المستدام." />
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
              تعرف على فريقنا
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              الأشخاص الشغوفون الذين يجعلون من مهمتنا حقيقة واقعة.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden text-center group"
              >
                <div className="relative h-64">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={member.imageText}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3 space-x-reverse">
                    <a href="#" className="text-gray-400 hover:text-emerald-500"><Linkedin size={20} /></a>
                    <a href="#" className="text-gray-400 hover:text-emerald-500"><Twitter size={20} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;