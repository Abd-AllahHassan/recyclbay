import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { allProducts } from '@/data/products.js';
import { useCart } from '@/contexts/CartContext';

const products = allProducts.slice(0, 4);

const FeaturedProducts = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product);
    toast({
      title: "🛒 تمت إضافة المنتج للسلة!",
      description: `تمت إضافة "${product.name}" إلى سلة التسوق بنجاح.`,
    });
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="w-full hero-gradient text-white py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
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