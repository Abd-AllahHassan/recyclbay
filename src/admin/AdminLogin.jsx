import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, User, Mail, Server, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.username.trim(), formData.password);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        setError(result.message || 'فشل في تسجيل الدخول');
      }
    } catch (error) {
      console.error('Login error:', error);

      // Provide specific error messages based on error type
      if (error.message.includes('CORS_ERROR')) {
        setError('خطأ في الاتصال: يرجى التأكد من أن الخادم الخلفي يعمل وأن إعدادات CORS صحيحة');
      } else if (error.message.includes('CONNECTION_ERROR')) {
        setError('لا يمكن الاتصال بالخادم الخلفي. يرجى التأكد من أن الخادم يعمل على http://localhost:5000');
      } else if (error.message.includes('Failed to fetch')) {
        setError('فشل في الاتصال بالخادم. يرجى التحقق من تشغيل الخادم الخلفي');
      } else {
        setError(error.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>تسجيل دخول المدير - RecycleBay Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                دخول لوحة التحكم
              </h2>
              <p className="text-gray-600">
                أدخل بيانات الدخول للوصول إلى لوحة إدارة RecycleBay
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
              >
                <CheckCircle className="w-5 h-5 text-green-600 ml-3" />
                <p className="text-green-800 text-sm">تم تسجيل الدخول بنجاح! جاري التوجيه...</p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 ml-3 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-red-800 text-sm font-medium">خطأ في تسجيل الدخول</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم المستخدم"
                    className="pr-10"
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="أدخل كلمة المرور"
                    className="pr-10"
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    disabled={loading || success}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
                  disabled={loading || success}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      جاري تسجيل الدخول...
                    </div>
                  ) : success ? (
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 ml-2" />
                      تم تسجيل الدخول بنجاح
                    </div>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </div>
            </form>

            {/* Connection Status */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start">
                <Server className="w-5 h-5 text-yellow-600 ml-3 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-yellow-900 mb-2">
                    حالة الاتصال بالخادم
                  </h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• تأكد من تشغيل الخادم الخلفي على http://localhost:5000</li>
                    <li>• تحقق من إعدادات CORS في الخادم</li>
                    <li>• يجب أن يسمح الخادم بالطلبات من http://localhost:5173</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-xs font-medium text-gray-700 mb-2">بيانات تجريبية:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>اسم المستخدم:</strong> admin</p>
                <p><strong>كلمة المرور:</strong> admin123</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                معلومات الأمان
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• يتم تشفير جميع البيانات المرسلة</li>
                <li>• اسم المستخدم وكلمة المرور مطلوبان للوصول</li>
                <li>• سيتم تسجيل خروجك تلقائياً عند انتهاء الجلسة</li>
                <li>• يتم تخزين رمز الدخول بشكل آمن في المتصفح</li>
              </ul>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              RecycleBay Admin Panel
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © 2024 RecycleBay. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
