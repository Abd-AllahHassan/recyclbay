// Simple test to check API connection
const API_BASE_URL = 'http://localhost:5000/api';

const testConnection = async () => {
  try {
    console.log('Testing API connection...');

    // Test basic connectivity
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API is responding:', data);
    } else {
      console.log('❌ API responded with status:', response.status);
    }
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
  }
};

// Test authentication endpoint
const testAuth = async () => {
  try {
    console.log('Testing authentication endpoint...');

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });

    const data = await response.json();
    console.log('Auth response:', response.status, data);
  } catch (error) {
    console.error('❌ Auth test failed:', error.message);
  }
};

// Test orders endpoint
const testOrders = async () => {
  try {
    console.log('Testing orders endpoint...');

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Orders response:', response.status, data);
  } catch (error) {
    console.error('❌ Orders test failed:', error.message);
  }
};

// Run tests
testConnection();
testAuth();
testOrders();
