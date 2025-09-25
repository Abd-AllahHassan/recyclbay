import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingCart,
  Users,
  Heart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  RefreshCw,
  Plus,
  Eye,
  X,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiService from '@/services/apiService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Popup states
  const [activePopup, setActivePopup] = useState(null);
  const [popupData, setPopupData] = useState({
    recentOrders: [],
    pendingDonations: [],
    analytics: null,
    newProduct: {
      name: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      condition: '',
      brand: '',
      status: 'active',
      images: []
    }
  });
  const [popupLoading, setPopupLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await apiService.getStats();

      if (response.success) {
        setStats(response.data);
      } else {
        setError('فشل في تحميل بيانات لوحة التحكم');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('حدث خطأ أثناء تحميل بيانات لوحة التحكم');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data for popups
  const fetchRecentOrders = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getOrders({ limit: 5, status: 'pending' });
      if (response.success) {
        setPopupData(prev => ({ ...prev, recentOrders: response.data }));
      }
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchPendingDonations = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getDonations({ status: 'pending' });
      if (response.success) {
        setPopupData(prev => ({ ...prev, pendingDonations: response.data }));
      }
    } catch (error) {
      console.error('Error fetching pending donations:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setPopupLoading(true);
    try {
      const response = await apiService.getStats();
      if (response.success) {
        setPopupData(prev => ({ ...prev, analytics: response.data.stats }));
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setPopupLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));

    setPopupData(prev => ({
      ...prev,
      newProduct: {
        ...prev.newProduct,
        images: imageUrls
      }
    }));
  };

  const removeImage = (index) => {
    setPopupData(prev => ({
      ...prev,
      newProduct: {
        ...prev.newProduct,
        images: prev.newProduct.images.filter((_, i) => i !== index)
      }
    }));
  };

  const handleCreateProduct = async () => {
    try {
      // Validate required fields
      const requiredFields = ['name', 'description', 'price', 'category', 'quantity', 'condition'];
      const missingFields = requiredFields.filter(field => !popupData.newProduct[field]);

      if (missingFields.length > 0) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      const response = await apiService.createProduct(popupData.newProduct);
      if (response.success) {
        alert('تم إضافة المنتج بنجاح');
        setActivePopup(null);
        setPopupData(prev => ({
          ...prev,
          newProduct: {
            name: '',
            description: '',
            price: '',
            category: '',
            quantity: '',
            condition: '',
            brand: '',
            status: 'active',
            images: []
          }
        }));
        fetchDashboardData(); // Refresh dashboard
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('حدث خطأ أثناء إضافة المنتج');
    }
  };

  const openPopup = (popupType) => {
    setActivePopup(popupType);

    // Fetch data based on popup type
    switch (popupType) {
      case 'orders':
        fetchRecentOrders();
        break;
      case 'donations':
