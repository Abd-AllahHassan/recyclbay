import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartPopup from '@/components/CartPopup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, togglePopup } = useCart();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body overflow when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);

    if (href.startsWith('/')) {
      navigate(href);
    } else if (location.pathname === '/') {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/' + href);
    }
  };

  const handleShopClick = () => {
    navigate('/products');
    setIsMenuOpen(false);
  };

  const handleCartClick = () => {
    togglePopup();
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    { name: 'خدماتنا', href: '/services' },
    { name: 'تبرع', href: '/donations' },
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  const logoContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    animate: (i) => ({
      rotate: [0, -5, 5, -5, 0],
      transition: {
        delay: i * 0.2,
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2,
      },
    }),
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center flex-shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="flex items-center"
              variants={logoContainerVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src="https://horizons-cdn.hostinger.com/f5871f83-294f-4937-97d7-0c25519a29be/d4cef676a06726fade28b67e707073ac.png"
                alt="RecycleBay Logo"
                className="h-12 w-auto md:h-14"
                custom={0}
                variants={iconVariants}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group bg-transparent border-none text-sm lg:text-base ${
                  location.pathname === item.href ? 'text-emerald-600' : ''
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 right-0 w-0 h-0.5 bg-emerald-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <button
              onClick={handleCartClick}
              aria-label="عربة التسوق"
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Button
              onClick={handleShopClick}
              className="hero-gradient text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 text-sm"
            >
              تسوق الآن
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 space-x-reverse lg:hidden">
            <button
              onClick={handleCartClick}
              aria-label="عربة التسوق"
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-emerald-50 transition-colors"
              aria-label="تبديل القائمة"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="lg:hidden fixed inset-0 z-40"
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/20"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel - FIXED: Added left-0 to ensure it stays within viewport */}
        <div className="absolute top-0 right-0 left-0 sm:left-auto w-full sm:w-80 h-full bg-white shadow-xl overflow-y-auto">
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b w-full">
              <Link 
                to="/" 
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <img
                  src="https://horizons-cdn.hostinger.com/f5871f83-294f-4937-97d7-0c25519a29be/d4cef676a06726fade28b67e707073ac.png"
                  alt="RecycleBay Logo"
                  className="h-10 w-auto"
                />
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="إغلاق القائمة"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 w-full">
              <div className="space-y-4 w-full">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-right py-3 px-4 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 font-medium text-lg ${
                      location.pathname === item.href ? 'text-emerald-600 bg-emerald-50' : ''
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: -5 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="mt-8 w-full"
              >
                <Button
                  onClick={handleShopClick}
                  className="hero-gradient text-white w-full py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  تسوق الآن
                </Button>
              </motion.div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t w-full">
              <div className="text-center text-gray-500 text-sm">
                © 2024 RecycleBay. جميع الحقوق محفوظة.
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <CartPopup />
    </motion.header>
  );
};

export default Header;