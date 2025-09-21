import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Search, LifeBuoy, BookOpen, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const HelpCenterPage = () => {
  const supportChannels = [
    {
      icon: <BookOpen className="w-10 h-10 text-emerald-600" />,
      title: "قاعدة المعرفة",
      description: "تصفح مقالاتنا وأدلةنا للعثور على إجابات لأسئلتك.",
      action: "تصفح المقالات"
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-emerald-600" />,
      title: "تواصل معنا",
      description: "هل تحتاج إلى مساعدة شخصية؟ فريق الدعم لدينا جاهز للمساعدة.",
      action: "أرسل رسالة"
    },
    {
      icon: <LifeBuoy className="w-10 h-10 text-emerald-600" />,
      title: "دعم المجتمع",
      description: "انضم إلى منتدى مجتمعنا لطرح الأسئلة ومشاركة النصائح.",
      action: "زيارة المنتدى"
    }
  ];

  const handleActionClick = () => {
    toast({
      title: "🚧 هذه الميزة غير مُفعلة بعد",
      description: "لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>مركز المساعدة - ريسيكل باي</title>
        <meta name="description" content="ابحث عن المساعدة والدعم لجميع استفساراتك المتعلقة بـ ريسيكل باي. نحن هنا لمساعدتك." />
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
              كيف يمكننا مساعدتك؟
            </h1>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Input
                type="search"
                placeholder="ابحث في مركز المساعدة..."
                className="h-14 pl-12 pr-4 text-lg rounded-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col"
              >
                <div className="mx-auto bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  {channel.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{channel.title}</h2>
                <p className="text-gray-600 flex-grow mb-6">{channel.description}</p>
                <Button onClick={handleActionClick} variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                  {channel.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage;