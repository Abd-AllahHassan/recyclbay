// Backend Example Server for RecycleBay Admin API
// This is a basic Express.js server to handle admin authentication
// Run this with: node backend-example.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow frontend origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mock admin user database
const mockAdminUser = {
  id: 'admin-123',
  username: 'admin',
  password: 'admin123', // In real app, this would be hashed
  role: 'admin'
};

// Mock data for testing
const mockProducts = [
  {
    _id: 'prod-1',
    name: 'لابتوب ديل مستعمل',
    nameEn: 'Used Dell Laptop',
    category: 'إلكترونيات',
    price: 2500,
    stock: 3,
    status: 'active',
    condition: 'جيد',
    location: 'الرياض',
    image: 'https://via.placeholder.com/100'
  },
  {
    _id: 'prod-2',
    name: 'طابعة إتش بي',
    nameEn: 'HP Printer',
    category: 'إلكترونيات',
    price: 800,
    stock: 0,
    status: 'out_of_stock',
    condition: 'ممتاز',
    location: 'جدة',
    image: 'https://via.placeholder.com/100'
  },
  {
    _id: 'prod-3',
    name: 'كرسي مكتبي',
    nameEn: 'Office Chair',
    category: 'أثاث',
    price: 450,
    stock: 1,
    status: 'low_stock',
    condition: 'جيد',
    location: 'الدمام',
    image: 'https://via.placeholder.com/100'
  }
];

const mockOrders = [
  {
    _id: 'order-1234',
    user: { name: 'أحمد محمد' },
    totalPrice: 3300,
    status: 'pending',
    createdAt: new Date().toISOString(),
    products: [
      { product: { name: 'لابتوب ديل مستعمل' }, quantity: 1, price: 2500 },
      { product: { name: 'طابعة إتش بي' }, quantity: 1, price: 800 }
    ],
    shippingAddress: {
      street: 'شارع الملك فهد',
      city: 'الرياض',
      state: 'الرياض'
    }
  },
  {
    _id: 'order-1235',
    user: { name: 'فاطمة علي' },
    totalPrice: 450,
    status: 'delivered',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    products: [
      { product: { name: 'كرسي مكتبي' }, quantity: 1, price: 450 }
    ]
  }
];

const mockDonations = [
  {
    _id: 'don-1',
    donorName: 'سارة أحمد',
    donorPhone: '+966501234567',
    donorEmail: 'sara@example.com',
    location: 'الرياض',
    status: 'pending',
    requestDate: new Date().toISOString(),
    items: [
      { name: 'ملابس أطفال', condition: 'جيد', quantity: 5 },
      { name: 'ألعاب', condition: 'ممتاز', quantity: 3 }
    ],
    notes: 'الملابس بحالة جيدة ونظيفة'
  },
  {
    _id: 'don-2',
    donorName: 'محمد خالد',
    donorPhone: '+966507654321',
    location: 'جدة',
    status: 'approved',
    requestDate: new Date(Date.now() - 172800000).toISOString(),
    items: [
      { name: 'كتب دراسية', condition: 'جيد', quantity: 10 },
      { name: 'أدوات مكتبية', condition: 'ممتاز', quantity: 2 }
    ]
  }
];

const mockUsers = [
  {
    _id: 'user-1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    role: 'user',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'user-2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    role: 'manager',
    isActive: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'user-3',
    name: 'خالد سعد',
    email: 'khaled@example.com',
    role: 'admin',
    isActive: true,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  console.log('Login attempt:', { username, password });

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'اسم المستخدم وكلمة المرور مطلوبان'
    });
  }

  // Check credentials (in real app, verify against hashed password)
  if (username === mockAdminUser.username && password === mockAdminUser.password) {
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: mockAdminUser.id,
        username: mockAdminUser.username,
        role: mockAdminUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful, token generated');

    return res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token: token,
      user: {
        id: mockAdminUser.id,
        username: mockAdminUser.username,
        role: mockAdminUser.role
      }
    });
  } else {
    console.log('Login failed: invalid credentials');
    return res.status(401).json({
      success: false,
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'رمز الدخول مطلوب'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'رمز الدخول غير صالح أو منتهي الصلاحية'
      });
    }
    req.user = user;
    next();
  });
};

// Protected admin routes
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user.userId,
        username: req.user.username,
        role: req.user.role
      }
    }
  });
});

// Admin stats endpoint
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  console.log('Stats endpoint called');
  res.json({
    success: true,
    data: {
      products: {
        total: mockProducts.length,
        active: mockProducts.filter(p => p.status === 'active').length,
        lowStock: mockProducts.filter(p => p.stock <= 5 && p.stock > 0).length
      },
      orders: {
        total: mockOrders.length,
        pending: mockOrders.filter(o => o.status === 'pending').length,
        totalRevenue: mockOrders.reduce((sum, order) => sum + order.totalPrice, 0)
      },
      users: {
        total: mockUsers.length,
        active: mockUsers.filter(u => u.isActive).length
      },
      donations: {
        total: mockDonations.length,
        pending: mockDonations.filter(d => d.status === 'pending').length
      }
    }
  });
});

// Products endpoints
app.get('/api/products', authenticateToken, (req, res) => {
  const { page = 1, limit = 10, category, status } = req.query;
  let filteredProducts = [...mockProducts];

  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (status && status !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedProducts,
    pagination: {
      total: filteredProducts.length,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

app.delete('/api/products/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const productIndex = mockProducts.findIndex(p => p._id === id);

  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'المنتج غير موجود'
    });
  }

  mockProducts.splice(productIndex, 1);
  res.json({
    success: true,
    message: 'تم حذف المنتج بنجاح'
  });
});

// Orders endpoints
app.get('/api/orders', authenticateToken, (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  let filteredOrders = [...mockOrders];

  if (status && status !== 'all') {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedOrders,
    pagination: {
      total: filteredOrders.length,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

app.put('/api/orders/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const orderIndex = mockOrders.findIndex(o => o._id === id);

  if (orderIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'الطلب غير موجود'
    });
  }

  mockOrders[orderIndex].status = status;
  res.json({
    success: true,
    message: 'تم تحديث حالة الطلب بنجاح',
    data: mockOrders[orderIndex]
  });
});

// Donations endpoints
app.get('/api/donations', authenticateToken, (req, res) => {
  const { status } = req.query;
  let filteredDonations = [...mockDonations];

  if (status && status !== 'all') {
    filteredDonations = filteredDonations.filter(d => d.status === status);
  }

  res.json({
    success: true,
    data: filteredDonations
  });
});

app.put('/api/donations/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const donationIndex = mockDonations.findIndex(d => d._id === id);

  if (donationIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'طلب التبرع غير موجود'
    });
  }

  mockDonations[donationIndex].status = status;
  res.json({
    success: true,
    message: 'تم تحديث حالة طلب التبرع بنجاح',
    data: mockDonations[donationIndex]
  });
});

// Users endpoint
app.get('/api/admin/users', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: mockUsers
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Admin login endpoint: POST http://localhost:${PORT}/api/admin/login`);
  console.log(`📊 Stats endpoint: GET http://localhost:${PORT}/api/admin/stats`);
  console.log(`📦 Products endpoint: GET http://localhost:${PORT}/api/products`);
  console.log(`🛒 Orders endpoint: GET http://localhost:${PORT}/api/orders`);
  console.log(`💝 Donations endpoint: GET http://localhost:${PORT}/api/donations`);
  console.log(`👥 Users endpoint: GET http://localhost:${PORT}/api/admin/users`);
  console.log(`🔐 Test credentials: username: admin, password: admin123`);
  console.log(`🌐 CORS enabled for: http://localhost:5173, http://localhost:3000`);
});
