import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import apiService from '@/services/apiService';

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getPublicProducts({ limit: 4 });

        if (response.success && response.data && response.data.length > 0) {
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
          // Fallback to static products if API fails or no data
          const fallbackProducts = [
            {
              id: '1',
              name: 'كرسي مكتبي مستدام',
              image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category: 'مكاتب',
              price: '150 ريال',
              description: 'كرسي مكتبي مريح مصنوع من مواد مستدامة، مثالي للعمل اليومي.',
              deliveryFee: 'مجاني',
              deliveryTime: '1-2 أيام',
              city: 'أبوظبي',
              size: 'متوسط',
              condition: 'ممتاز'
            },
            {
              id: '2',
              name: 'طاولة طعام خشبية',
              image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category: 'طاولات',
              price: '300 ريال',
              description: 'طاولة طعام خشبية مجددة، سعة 6 أشخاص، تصميم كلاسيكي.',
              deliveryFee: 'مجاني',
              deliveryTime: '1-2 أيام',
              city: 'أبوظبي',
              size: 'كبير',
              condition: 'جيد'
            },
            {
              id: '3',
              name: 'أريكة جلدية',
              image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category: 'أرائك',
              price: '450 ريال',
              description: 'أريكة جلدية فاخرة، مثالية للصالة، سهلة التنظيف.',
              deliveryFee: 'مجاني',
              deliveryTime: '1-2 أيام',
              city: 'أبوظبي',
              size: 'كبير',
              condition: 'ممتاز'
            },
            {
              id: '4',
              name: 'خزانة ملابس',
              image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              category: 'خزانات',
              price: '200 ريال',
              description: 'خزانة ملابس واسعة، مصنوعة من خشب مستدام، تناسب غرفة النوم.',
              deliveryFee: 'مجاني',
              deliveryTime: '1-2 أيام',
              city: 'أبوظبي',
              size: 'متوسط',
              condition: 'جيد'
            }
          ];
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Use fallback products on error
        const fallbackProducts = [
          {
            id: '1',
            name: 'كرسي مكتبي مستدام',
            image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'مكاتب',
            price: '150 ريال',
            description: 'كرسي مكتبي مريح مصنوع من مواد مستدامة، مثالي للعمل اليومي.',
            deliveryFee: 'مجاني',
            deliveryTime: '1-2 أيام',
            city: 'أبوظبي',
            size: 'متوسط',
            condition: 'ممتاز'
          },
          {
            id: '2',
            name: 'طاولة طعام خشبية',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'طاولات',
            price: '300 ريال',
            description: 'طاولة طعام خشبية مجددة، سعة 6 أشخاص، تصميم كلاسيكي.',
            deliveryFee: 'مجاني',
            deliveryTime: '1-2 أيام',
            city: 'أبوظبي',
            size: 'كبير',
            condition: 'جيد'
          },
          {
            id: '3',
            name: 'أريكة جلدية',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'أرائك',
            price: '450 ريال',
            description: 'أريكة جلدية فاخرة، مثالية للصالة، سهلة التنظيف.',
            deliveryFee: 'مجاني',
            deliveryTime: '1-2 أيام',
            city: 'أبوظبي',
            size: 'كبير',
            condition: 'ممتاز'
          },
          {
            id: '4',
            name: 'خزانة ملابس',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'خزانات',
            price: '200 ريال',
            description: 'خزانة ملابس واسعة، مصنوعة من خشب مستدام، تناسب غرفة النوم.',
            deliveryFee: 'مجاني',
            deliveryTime: '1-2 أيام',
            city: 'أبوظبي',
            size: 'متوسط',
            condition: 'جيد'
          }
        ];
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItem(product);
    toast({
      title: "🛒 تمت إضافة المنتج للسلة!",
      description: `تمت إضافة "${product.name}" إلى سلة التسوق بنجاح.`,
    });
  };

  if (loading) {
    return (
      <section id="featured-products" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-center text-gray-800 mb-12 leading-tight"
          >
            أحدث القطع التي انضمت لمجموعتنا
          </motion.h2>
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // No error state needed as fallback handles it

  return (
    <section id="featured-products" className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12 leading-tight"
        >
          أحدث القطع التي انضمت لمجموعتنا
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden min-h-[350px] sm:min-h-[400px] transform hover:scale-105 transition-transform duration-300 ease-in-out group"
            >
              <div className="relative min-h-48 sm:min-h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-xl sm:text-2xl font-bold text-emerald-600">{product.price}</span>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full hero-gradient text-white py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 text-sm"
                >
                  أضف للسلة
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;