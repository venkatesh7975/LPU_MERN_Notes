# File Upload Guide

## ✅ Issues Fixed

1. **API Route Mismatch**: Fixed frontend calling `POST /api/user/upload-profile-pic` instead of `PUT /api/user/profile/picture`
2. **Added File Validation**: Added file type and size validation
3. **Enhanced Error Handling**: Added comprehensive error logging and user feedback
4. **Fallback Image**: Added placeholder image when profile picture fails to load
5. **Debug Logging**: Added detailed console logs for troubleshooting

## 🧪 How to Test File Upload

### Step 1: Start the Application
```bash
# Start frontend
cd frontend
npm run dev

# Backend is already running on Render
```

### Step 2: Test the Upload Flow
1. **Open the app**: Go to `http://localhost:5173`
2. **Log in**: Create an account or sign in
3. **Go to Dashboard**: You should see your profile section
4. **Click the camera icon** (📷) next to your profile picture
5. **Select an image file** (JPEG, PNG, GIF, or WebP)
6. **Wait for upload**: Check console logs for progress

### Step 3: Expected Behavior
- ✅ File validation (type and size)
- ✅ Upload progress in console
- ✅ Cloudinary upload
- ✅ Profile picture updates immediately
- ✅ Success message appears
- ✅ User state updates

## 🔍 Console Logs to Watch

### Frontend Logs
```
📁 File selected: image.jpg Size: 123456 Type: image/jpeg
📤 Uploading profile picture...
✅ Upload successful: {profilePic: "https://..."}
```

### Backend Logs
```
📁 Profile picture upload request received
📁 File: {fieldname: "profilePic", originalname: "image.jpg", ...}
☁️ Uploading to Cloudinary...
✅ Cloudinary upload successful: https://...
💾 Profile picture saved to user: user@example.com
```

## 🐛 Troubleshooting

### Issue 1: "No file uploaded" error
**Cause**: File not being sent properly
**Solution**: 
- Check file input is working
- Verify file is selected before upload
- Check browser console for errors

### Issue 2: "File size must be less than 5MB"
**Cause**: File too large
**Solution**: 
- Compress the image
- Use a smaller image file
- Convert to WebP format for better compression

### Issue 3: "Please select an image file"
**Cause**: Wrong file type
**Solution**: 
- Use JPEG, PNG, GIF, or WebP files
- Check file extension matches content

### Issue 4: Cloudinary upload fails
**Cause**: Cloudinary credentials not configured
**Solution**: 
- Check backend environment variables
- Verify Cloudinary account is active
- Check network connectivity

### Issue 5: Profile picture doesn't update
**Cause**: User state not updating
**Solution**: 
- Check if `onUserUpdate` is called
- Verify user object is updated
- Check if component re-renders

## 🔧 Technical Details

### Frontend API Call
```javascript
// File: frontend/src/api.js
uploadProfilePic: (formData) => api.put('/api/user/profile/picture', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
```

### Backend Route
```javascript
// File: backend/routes/userRoutes.js
router.put('/profile/picture', upload.single('profilePic'), updateProfilePicture);
```

### File Validation
```javascript
// Allowed file types
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// File size limit
const maxSize = 5 * 1024 * 1024; // 5MB
```

### Cloudinary Configuration
```javascript
// File: backend/config/cloudinary.js
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

## 📁 File Structure

```
frontend/src/
├── components/
│   └── Dashboard.jsx          # Upload functionality
├── api.js                     # API configuration
└── config/
    └── env.js                 # Environment variables

backend/
├── controllers/
│   └── userController.js      # Upload handler
├── routes/
│   └── userRoutes.js          # Upload route
├── config/
│   └── cloudinary.js          # Cloudinary config
└── package.json               # Dependencies
```

## 🚀 Next Steps

1. **Test the upload functionality** with different file types
2. **Verify the profile picture updates** in the UI
3. **Check if the image persists** after page reload
4. **Test with different file sizes** to ensure validation works
5. **Monitor console logs** for any errors

## 📝 Notes

- File uploads are handled by Multer middleware
- Images are stored on Cloudinary CDN
- Profile pictures are cached by the browser
- Upload progress is logged to console
- Error messages are displayed to the user 