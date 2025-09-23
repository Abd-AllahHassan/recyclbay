// API Service for RecycleBay Backend Integration - Functional Programming Approach
const API_BASE_URL = 'http://localhost:5000/api';

// Configuration constants
const CONFIG = {
  BASE_URL: API_BASE_URL,
  STORAGE_KEYS: {
    TOKEN: 'adminToken'
  },
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    AUTHORIZATION: 'Authorization'
  }
};

// Pure utility functions
const createUrl = (baseUrl) => (endpoint) => `${baseUrl}${endpoint}`;

const buildQueryString = (params) =>
  Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : '';

const createHeaders = (token) => (additionalHeaders = {}) => ({
  'Content-Type': CONFIG.HEADERS.CONTENT_TYPE,
  ...(token && { [CONFIG.HEADERS.AUTHORIZATION]: `Bearer ${token}` }),
  ...additionalHeaders
});

// Token management - pure functions
const getTokenFromStorage = () => localStorage.getItem(CONFIG.STORAGE_KEYS.TOKEN);

const setTokenToStorage = (token) => {
  localStorage.setItem(CONFIG.STORAGE_KEYS.TOKEN, token);
  return token;
};

const clearTokenFromStorage = () => {
  localStorage.removeItem(CONFIG.STORAGE_KEYS.TOKEN);
  return null;
};

// Error handling utilities
const createError = (type, message) => ({ type, message });

const isCorsError = (error) =>
  error.message.includes('CORS_ERROR') || error.message.includes('Failed to fetch');

const isAuthError = (status) => status === 401;

const isConnectionError = (error) =>
  error.message.includes('CONNECTION_ERROR') || error.message.includes('Failed to fetch');

// HTTP method constants
const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// Request configuration builder
const buildRequestConfig = (method, body, additionalHeaders = {}) => (token) => ({
  method,
  headers: createHeaders(token)(additionalHeaders),
  ...(body && { body: JSON.stringify(body) })
});

// Generic request handler - pure function
const makeRequest = async (url, config) => {
  try {
    const response = await fetch(url, config);

    // Handle CORS errors specifically
    if (!response.ok && response.status === 0) {
      throw createError('CORS_ERROR', 'Unable to connect to the backend server. Please ensure the backend is running and CORS is properly configured.');
    }

    const data = await response.json();

    if (!response.ok) {
      // Handle authentication errors
      if (isAuthError(response.status)) {
        clearTokenFromStorage();
        window.location.href = '/admin/login';
      }

      throw createError('HTTP_ERROR', data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);

    // Provide more specific error messages for common issues
    if (isCorsError(error)) {
      throw createError('CORS_ERROR', 'Unable to connect to the backend server. Please ensure the backend is running and CORS is properly configured.');
    }

    if (error.message.includes('Failed to fetch')) {
      throw createError('CONNECTION_ERROR', 'Unable to connect to the backend server. Please check if the backend is running on http://localhost:5000');
    }

    throw error;
  }
};

// Higher-order function for authenticated requests
const withAuth = (requestFn) => (token) => async (...args) => {
  const result = await requestFn(token)(...args);
  return result;
};

// Request builders for different HTTP methods
const createGetRequest = (endpoint) => (token) => (params = {}) => {
  const url = createUrl(CONFIG.BASE_URL)(endpoint) + buildQueryString(params);
  const config = buildRequestConfig(METHODS.GET)(token);
  return makeRequest(url, config);
};

const createPostRequest = (endpoint) => (token) => (body) => {
  const url = createUrl(CONFIG.BASE_URL)(endpoint);
  const config = buildRequestConfig(METHODS.POST, body)(token);
  return makeRequest(url, config);
};

const createPutRequest = (endpoint) => (token) => (body) => {
  const url = createUrl(CONFIG.BASE_URL)(endpoint);
  const config = buildRequestConfig(METHODS.PUT, body)(token);
  return makeRequest(url, config);
};

const createDeleteRequest = (endpoint) => (token) => () => {
  const url = createUrl(CONFIG.BASE_URL)(endpoint);
  const config = buildRequestConfig(METHODS.DELETE)(token);
  return makeRequest(url, config);
};

// Authentication functions
const login = (token) => {
  const request = createPostRequest('/auth/login')();
  return request({ token }).then(response => {
    if (response.success) {
      setTokenToStorage(response.token);
    }
    return response;
  });
};

const adminLogin = (username, password) => {
  const request = createPostRequest('/auth/login')(); // Correct endpoint: /auth/login
  return request({ username, password }).then(response => {
    if (response.success && response.token) {
      setTokenToStorage(response.token);
    }
    return response;
  });
};

const getCurrentUser = () => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/auth/me')(token);
  return request();
};

// Product functions
const getProducts = (params = {}) => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/products')(token);
  return request(params);
};

const getProduct = (id) => {
  const token = getTokenFromStorage();
  const request = createGetRequest(`/products/${id}`)(token);
  return request();
};

const createProduct = (productData) => {
  const token = getTokenFromStorage();
  const request = createPostRequest('/products')(token);
  return request(productData);
};

const updateProduct = (id, productData) => {
  const token = getTokenFromStorage();
  const request = createPutRequest(`/products/${id}`)(token);
  return request(productData);
};

const deleteProduct = (id) => {
  const token = getTokenFromStorage();
  const request = createDeleteRequest(`/products/${id}`)(token);
  return request();
};

// Order functions
const getOrders = (params = {}) => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/orders')(token);
  return request(params);
};

const getOrder = (id) => {
  const token = getTokenFromStorage();
  const request = createGetRequest(`/orders/${id}`)(token);
  return request();
};

const createOrder = (orderData) => {
  const token = getTokenFromStorage();
  const request = createPostRequest('/orders')(token);
  return request(orderData);
};

const updateOrder = (id, orderData) => {
  const token = getTokenFromStorage();
  const request = createPutRequest(`/orders/${id}`)(token);
  return request(orderData);
};

const deleteOrder = (id) => {
  const token = getTokenFromStorage();
  const request = createDeleteRequest(`/orders/${id}`)(token);
  return request();
};

// Donation functions
const getDonations = (params = {}) => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/donations')(token);
  return request(params);
};

const getDonation = (id) => {
  const token = getTokenFromStorage();
  const request = createGetRequest(`/donations/${id}`)(token);
  return request();
};

const createDonation = (donationData) => {
  const token = getTokenFromStorage();
  const request = createPostRequest('/donations')(token);
  return request(donationData);
};

const updateDonation = (id, donationData) => {
  const token = getTokenFromStorage();
  const request = createPutRequest(`/donations/${id}`)(token);
  return request(donationData);
};

const deleteDonation = (id) => {
  const token = getTokenFromStorage();
  const request = createDeleteRequest(`/donations/${id}`)(token);
  return request();
};

// Notification functions (NEW - based on API documentation)
const getNotifications = (params = {}) => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/notifications')(token);
  return request(params);
};

const getNotification = (id) => {
  const token = getTokenFromStorage();
  const request = createGetRequest(`/notifications/${id}`)(token);
  return request();
};

const createNotification = (notificationData) => {
  const token = getTokenFromStorage();
  const request = createPostRequest('/notifications')(token);
  return request(notificationData);
};

const updateNotification = (id, notificationData) => {
  const token = getTokenFromStorage();
  const request = createPutRequest(`/notifications/${id}`)(token);
  return request(notificationData);
};

const deleteNotification = (id) => {
  const token = getTokenFromStorage();
  const request = createDeleteRequest(`/notifications/${id}`)(token);
  return request();
};

// Admin functions - corrected endpoints
const getUsers = () => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/admin/users')(token);
  return request();
};

const getStats = () => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/admin/stats')(token);
  return request();
};

const getActivity = () => {
  const token = getTokenFromStorage();
  const request = createGetRequest('/admin/activity')(token);
  return request();
};

// Email functions (NEW - based on API documentation)
const sendEmail = (emailData) => {
  const token = getTokenFromStorage();
  const request = createPostRequest('/email/send')(token);
  return request(emailData);
};

// Export all functions as an object
const apiService = {
  // Authentication
  login,
  adminLogin,
  getCurrentUser,

  // Products
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

  // Orders
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,

  // Donations
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,

  // Notifications (NEW)
  getNotifications,
  getNotification,
  createNotification,
  updateNotification,
  deleteNotification,

  // Admin
  getUsers,
  getStats,
  getActivity,

  // Email (NEW)
  sendEmail,

  // Utility functions
  getTokenFromStorage,
  setTokenToStorage,
  clearTokenFromStorage
};

export default apiService;
