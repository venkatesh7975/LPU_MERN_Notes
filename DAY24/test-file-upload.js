const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'https://groupchat-with-payment.onrender.com';

async function testFileUpload() {
  try {
    console.log('🧪 Testing file upload functionality...');
    
    // Test health endpoint first
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Backend is running:', healthResponse.data);
    
    console.log('\n📋 File Upload Test Instructions:');
    console.log('1. Go to http://localhost:5173');
    console.log('2. Log in to your account');
    console.log('3. Go to Dashboard');
    console.log('4. Click on the camera icon (📷) next to your profile picture');
    console.log('5. Select an image file');
    console.log('6. Check console logs for upload progress');
    
    console.log('\n🔧 Expected Behavior:');
    console.log('- File should be uploaded to Cloudinary');
    console.log('- Profile picture should update immediately');
    console.log('- Success message should appear');
    
    console.log('\n🐛 If upload fails:');
    console.log('- Check browser console for error messages');
    console.log('- Verify file size is reasonable (< 5MB)');
    console.log('- Ensure file is an image (jpg, png, gif, etc.)');
    console.log('- Check if Cloudinary credentials are configured');
    
    console.log('\n📁 Backend Route: PUT /api/user/profile/picture');
    console.log('📁 Frontend API: uploadProfilePic()');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testFileUpload(); 