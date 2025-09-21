import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    emirate: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, emirate: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    toast({
      title: "✅ تم إرسال رسالتك بنجاح!",
      description: "شكرًا لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.",
    });
    setFormData({ name: '', phone: '', emirate: '', message: '' });
  };
  
  const emirates = ["أبوظبي", "دبي", "الشارقة", "عجمان", "أم القيوين", "رأس الخيمة", "الفجيرة"];

  return (
    <>
      <Helmet>
        <title>تواصل معنا - ريسيكل باي</title>
        <meta name="description" content="تواصل مع فريق ريسيكل باي. املأ النموذج أو استخدم معلومات الاتصال للتحدث إلينا مباشرة." />
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
              تواصل معنا
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نحن هنا للاستماع إليك. سواء كان لديك سؤال، اقتراح، أو تحتاج إلى مساعدة، فريقنا جاهز لخدمتك.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center"><User className="w-4 h-4 ml-2" />الاسم الكامل</Label>
                  <Input id="name" type="text" placeholder="مثال: أحمد محمد" required value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center"><Phone className="w-4 h-4 ml-2" />رقم الهاتف</Label>
                  <Input id="phone" type="tel" placeholder="مثال: 0501234567" required value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2 md:col-span-2">
                   <Label htmlFor="emirate" className="flex items-center"><MapPin className="w-4 h-4 ml-2" />الإمارة</Label>
                    <Select onValueChange={handleSelectChange} value={formData.emirate} required>
                        <SelectTrigger id="emirate">
                            <SelectValue placeholder="اختر الإمارة" />
                        </SelectTrigger>
                        <SelectContent>
                            {emirates.map(emirate => (
                                <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="message" className="flex items-center"><MessageSquare className="w-4 h-4 ml-2" />رسالتك</Label>
                  <Textarea id="message" placeholder="اكتب رسالتك هنا..." rows={5} required value={formData.message} onChange={handleInputChange} />
                </div>
              </div>
              <motion.div
                className="mt-8 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button type="submit" size="lg" className="w-full md:w-auto hero-gradient text-white font-bold">
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الرسالة
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;