import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleRemoveItem = (id) => {
    removeItem(id);
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج من السلة"
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "تم مسح السلة",
      description: "تم حذف جميع المنتجات من السلة"
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كود الخصم",
        variant: "destructive"
      });
      return;
    }

    // Simple coupon logic - you can expand this
    if (couponCode.toUpperCase() === 'RECYCLE10') {
      setDiscount(totalPrice * 0.1);
      toast({
        title: "تم تطبيق الخصم!",
        description: "خصم 10% على طلبك",
      });
    } else if (couponCode.toUpperCase() === 'WELCOME20') {
      setDiscount(totalPrice * 0.2);
      toast({
        title: "تم تطبيق الخصم!",
        description: "خصم 20% على طلبك",
      });
    } else {
      toast({
        title: "كود غير صحيح",
        description: "كود الخصم الذي أدخلته غير صحيح",
        variant: "destructive"
      });
    }
  };

  const finalPrice = totalPrice - discount;

  return (
    <>
      <Helmet>
        <title>سلة التسوق - RecycleBay</title>
        <meta name="description" content="عرض وإدارة منتجاتك في سلة التسوق على RecycleBay" />
      </Helmet>

      <div className="container mx-auto px-4 pt-28 pb-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <ShoppingCart className="w-8 h-8 text-emerald-600 ml-4" />
              <h1 className="text-3xl font-bold text-gray-800">سلة التسوق ({totalItems})</h1>
            </div>
            {items.length > 0 && (
              <Button
                onClick={handleClearCart}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                مسح السلة
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">سلتك فارغة</h2>
              <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات إلى سلتك بعد</p>
              <Button
                onClick={() => navigate('/products')}
                className="hero-gradient text-white px-6 py-3 rounded-full font-medium"
              >
                تصفح المنتجات
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-600">{item.category}</p>
                        <p className="text-sm text-gray-500">{item.city}</p>
                        <p className="text-emerald-600 font-semibold text-lg">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <Button
                        onClick={() => handleRemoveItem(item.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Coupon Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <Tag className="w-5 h-5 text-emerald-600 ml-2" />
                  <h3 className="text-lg font-semibold text-gray-800">كود الخصم</h3>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Input
                    type="text"
                    placeholder="أدخل كود الخصم"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    variant="outline"
                    className="px-6"
                  >
                    تطبيق
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  جرب: RECYCLE10 أو WELCOME20
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي:</span>
                    <span>{totalPrice.toFixed(2)} درهم</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>الخصم:</span>
                      <span>-{discount.toFixed(2)} درهم</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>رسوم التوصيل:</span>
                    <span className="text-green-600">مجاناً</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      المجموع الكلي: {finalPrice === 0 ? 'مجاناً' : `${finalPrice.toFixed(2)} درهم`}
                    </p>
                    <p className="text-sm text-gray-600">شامل التوصيل</p>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="hero-gradient text-white px-8 py-3 rounded-full font-medium"
                  >
                    إتمام الطلب
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default CartPage;
