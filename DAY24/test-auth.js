const axios = require('axios');

const API_BASE_URL = 'https://groupchat-with-payment.onrender.com';

// Test the authentication flow
async function testAuth() {
  try {
    console.log('🔍 Testing backend connectivity...');
    
    // Test health endpoint
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Backend is running:', healthResponse.data);
    
    console.log('\n📝 To test the full authentication flow:');
    console.log('1. Go to http://localhost:5173');
    console.log('2. Click "Sign up" to create a new account');
    console.log('3. Or click "Sign in" if you already have an account');
    console.log('4. Enter your email and password');
    console.log('5. Check your email for the OTP code');
    console.log('6. Enter the OTP to complete authentication');
    
    console.log('\n🔧 If you encounter issues:');
    console.log('- Check your browser console for detailed logs');
    console.log('- Make sure your email service is configured');
    console.log('- Verify the OTP is being sent to your email');
    
  } catch (error) {
    console.error('❌ Error testing backend:', error.message);
  }
}

testAuth(); 