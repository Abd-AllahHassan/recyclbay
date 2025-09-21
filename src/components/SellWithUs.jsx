
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/components/ui/use-toast';
import { Upload, Send, Camera, X, MapPin, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CameraCapture from '@/components/CameraCapture';
import LocationMap from '@/components/LocationMap';

const SellWithUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    emirate: '',
    description: '',
  });
  const [images, setImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, emirate: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleCameraCapture = (dataUrl) => {
    const blob = dataURLtoBlob(dataUrl);
    const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
    setImages(prev => [...prev, { file, preview: dataUrl }]);
  };

  const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "خدمة تحديد الموقع غير مدعومة في متصفحك.",
      });
      return;
    }

    setIsFetchingLocation(true);
    setLocation(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsFetchingLocation(false);
        toast({
          title: "✅ تم تحديد الموقع بنجاح!",
          description: "تم تسجيل موقعك الحالي وعرضه على الخريطة.",
        });
      },
      (error) => {
        setIsFetchingLocation(false);
        let errorMessage = "حدث خطأ أثناء تحديد الموقع.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "لقد رفضت الإذن بالوصول إلى موقعك.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "معلومات الموقع غير متاحة حاليًا.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "انتهت مهلة طلب تحديد الموقع.";
        }
        toast({
          variant: "destructive",
          title: "خطأ في تحديد الموقع",
          description: errorMessage,
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagePreviews = images.map(img => img.preview);

    const submissionData = {
      ...formData,
      location,
      images: imagePreviews,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    try {
      const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]');
      const updatedDonations = [...existingDonations, submissionData];
      localStorage.setItem('donations', JSON.stringify(updatedDonations));

      toast({
        title: "✅ تم استلام طلبك بنجاح!",
        description: "شكرًا لك! سيقوم فريقنا بمراجعة طلبك والتواصل معك قريبًا.",
      });

      setFormData({ name: '', phone: '', emirate: '', description: '' });
      setImages([]);
      setLocation(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في الحفظ",
        description: "لم نتمكن من حفظ طلبك. يرجى المحاولة مرة أخرى.",
      });
    }
  };

  const emirates = ["أبوظبي", "دبي", "الشارقة", "عجمان", "أم القيوين", "رأس الخيمة", "الفجيرة"];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            هل لديك أثاث <span className="text-gradient">للبيع أو التبرع؟</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            الأمر أسهل من أي وقت مضى! املأ النموذج أدناه وسنتكفل بالباقي.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1974&auto=format&fit=crop"
              alt="شخص يلتقط صورة لقطعة أثاث بهاتفه"
              className="rounded-2xl shadow-2xl w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input id="name" type="text" placeholder="اسمك" required value={formData.name} onChange={handleInputChange} className="h-12"/>
              <Input id="phone" type="tel" placeholder="رقم هاتفك" required value={formData.phone} onChange={handleInputChange} className="h-12"/>
              
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <Select onValueChange={handleSelectChange} value={formData.emirate} required>
                      <SelectTrigger className="h-12"><SelectValue placeholder="اختر الإمارة" /></SelectTrigger>
                      <SelectContent>
                        {emirates.map(emirate => <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isFetchingLocation} className="h-12">
                    {isFetchingLocation ? (
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    ) : (
                      <MapPin className="w-5 h-5 ml-2" />
                    )}
                    <span>
                      {location ? "تم التحديد" : (isFetchingLocation ? "جاري..." : "الموقع")}
                    </span>
                  </Button>
                </div>
                {!location && <p className="text-xs text-gray-500 text-center sm:text-right px-2">اضغط على "الموقع" لتحديد مكانك على الخريطة تلقائياً.</p>}
              </div>

              <LocationMap location={location} />
              <Textarea id="description" placeholder="وصف بسيط لقطعة الأثاث..." required value={formData.description} onChange={handleInputChange} />
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">اختر الصور</span>
                    <Input id="file-upload" type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
                  </label>
                  
                  <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" className="flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-500 transition-colors h-full">
                        <Camera className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">التقط صورة</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>التقاط صورة مباشرة</DialogTitle>
                      </DialogHeader>
                      <CameraCapture onCapture={handleCameraCapture} onOpenChange={setIsCameraOpen} />
                    </DialogContent>
                  </Dialog>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img src={image.preview} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-md" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full hero-gradient text-white font-bold h-12">
                <Send className="w-5 h-5 ml-2" />
                إرسال الطلب
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SellWithUs;
