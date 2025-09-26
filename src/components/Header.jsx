import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartPopup from '@/components/CartPopup';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, togglePopup } = useCart();

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
      className="fixed top-0 w-full z-50 bg-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 space-x-reverse">
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
              className="h-16 w-auto"
              custom={0}
              variants={iconVariants}
            />
          </motion.div>
        </Link>

        <motion.nav
          className="hidden md:flex items-center space-x-8 space-x-reverse"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-300 relative group bg-transparent border-none"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.name}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-emerald-500"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </motion.nav>

        <div className="hidden md:flex items-center space-x-4 space-x-reverse">
          <button
            onClick={togglePopup}
            aria-label="Cart"
            className="relative text-gray-700 hover:text-emerald-600 transition-colors duration-300 p-2"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Button
            onClick={handleShopClick}
            className="hero-gradient text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
          >
            تسوق الآن
          </Button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`md:hidden fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
        style={{ display: isMenuOpen ? 'block' : 'none' }}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <nav className="flex flex-col space-y-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={togglePopup}
                aria-label="Cart"
                className="relative text-gray-700 hover:text-emerald-600 transition-colors duration-300 p-2"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            {menuItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-700 hover:text-emerald-600 font-medium text-right py-3 transition-colors bg-transparent border-none text-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -10 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: menuItems.length * 0.1 }}
            >
              <Button
                onClick={handleShopClick}
                className="hero-gradient text-white px-6 py-3 rounded-full font-medium w-full mt-6"
              >
                تسوق الآن
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.div>
      </div>
      <CartPopup />
    </motion.header>
  );
};

export default Header;
