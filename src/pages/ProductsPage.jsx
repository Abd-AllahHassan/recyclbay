
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Tag, ShieldCheck, Sparkles, Truck, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from '@/contexts/CartContext';
import apiService from '@/services/apiService';

const ProductCard = ({ product }) => {
  const { addItem, addToWishlist, removeFromWishlist, wishlist } = useCart();

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "🛒 تمت إضافة المنتج للسلة!",
      description: `تمت إضافة "${product.name}" إلى سلة التسوق بنجاح.`,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "تم الحذف من المفضلة",
        description: `تم حذف "${product.name}" من قائمة المفضلة.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "❤️ تمت إضافة المنتج للمفضلة!",
        description: `تمت إضافة "${product.name}" إلى قائمة المفضلة.`,
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden group card-hover flex flex-col"
    >
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">{product.category}</div>
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 left-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all duration-300"
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
        </button>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <Button
              onClick={handleAddToCart}
              className="bg-white text-emerald-600 font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 ml-2" />
              أضف للسلة
            </Button>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center text-emerald-600 font-extrabold text-2xl mb-3">
          <Tag className="w-5 h-5 ml-2 text-emerald-500" />
          {product.price}
        </div>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center"><Truck className="w-4 h-4 ml-2 text-emerald-500" /> رسوم التوصيل: {product.deliveryFee}</div>
            <div className="flex items-center"><Clock className="w-4 h-4 ml-2 text-emerald-500" /> الوقت التقديري: {product.deliveryTime}</div>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                <Sparkles className="w-4 h-4 ml-2" />
                تم تعقيمه وتجديده بالكامل
            </div>
            <div className="flex items-center text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 ml-2" />
                ضمان 7 أيام ضد العيوب الخفية
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'الكل',
    condition: 'الكل'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPublicProducts();

        if (response.success) {
          // Transform API response to match component expectations
          const transformedProducts = response.data.map(product => ({
            id: product._id,
            name: product.name,
            image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder-image.jpg',
            category: product.category,
            price: `${product.price} ريال`,
            description: product.description,
            deliveryFee: 'مجاني',
            deliveryTime: '1-2 أيام',
            city: 'الرياض',
            size: 'متوسط',
            condition: product.condition
          }));
          setProducts(transformedProducts);
        } else {
          setError('فشل في تحميل المنتجات');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('حدث خطأ في تحميل المنتجات');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (filters.category === 'الكل' || product.category === filters.category) &&
             (filters.condition === 'الكل' || product.condition === filters.condition);
    });
  }, [products, filters]);

  // Generate filter options from current products
  const categories = ['الكل', ...new Set(products.map(p => p.category))];
  const conditions = ['الكل', ...new Set(products.map(p => p.condition))];

  return (
    <>
      <Helmet>
        <title>منتجاتنا | أثاث مجدد بأسعار مذهلة - ريسيكل باي</title>
        <meta name="description" content="تصفح مجموعتنا الكاملة من الأثاث المجدد والمستدام في RecycleBay. اعثر على كراسي، طاولات، أسرة، والمزيد. كل قطعة تم تجديدها بعناية لتبدو كالجديدة." />
        <meta name="keywords" content="منتجات الأثاث المجدد, أثاث مستعمل للبيع, أثاث مستدام, تسوق أثاث أونلاين, ريسيكل باي, ديكور منزلي, أثاث غرف نوم, أثاث غرف جلوس, أجهزة كهربائية مستعملة" />
        <meta property="og:title" content="منتجاتنا | اكتشف كنوز الأثاث المجدد في ريسيكل باي" />
        <meta property="og:description" content="كل قطعة أثاث لدينا تحكي قصة. تصفح مجموعتنا المتنوعة من الأثاث المجدد عالي الجودة بأسعار لا تقاوم." />
      </Helmet>
      <section className="py-20 pt-32 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ✨ جميع المنتجات
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              اكتشف كنوزنا <span className="text-gradient">المُجددة</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              قطع أثاث فريدة تم تجديدها بعناية، جاهزة لتكون جزءًا من منزلك.
            </p>
          </motion.div>

          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md mb-12 grid grid-cols-2 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Select onValueChange={(value) => handleFilterChange('category', value)} defaultValue="الكل">
                  <SelectTrigger><SelectValue placeholder="الفئة" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('condition', value)} defaultValue="الكل">
                  <SelectTrigger><SelectValue placeholder="الحالة" /></SelectTrigger>
                  <SelectContent>{conditions.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : (
            <>
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
              {filteredProducts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <p className="text-2xl font-semibold text-gray-500">عذراً، لا توجد منتجات تطابق معايير البحث الحالية.</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
