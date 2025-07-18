const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Get user profile
const getProfile = (req, res) => {
  res.json({ user: req.user });
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    req.user.name = name.trim();
    await req.user.save();
    
    res.json({ 
      message: 'Profile updated successfully',
      user: req.user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update profile picture
const updateProfilePicture = async (req, res) => {
  try {
    console.log('📁 Profile picture upload request received');
    console.log('📁 File:', req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'No file');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    console.log('☁️ Uploading to Cloudinary...');
    
    // Upload to Cloudinary
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'profile_pics', resource_type: 'image' },
          (error, result) => {
            if (result) {
              console.log('✅ Cloudinary upload successful:', result.secure_url);
              resolve(result);
            } else {
              console.error('❌ Cloudinary upload failed:', error);
              reject(error);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    
    const result = await streamUpload(req.file.buffer);
    
    // Save URL to user profile
    req.user.profilePic = result.secure_url;
    await req.user.save();
    
    console.log('💾 Profile picture saved to user:', req.user.email);
    
    res.json({
      message: 'Profile picture updated',
      profilePic: req.user.profilePic
    });
  } catch (error) {
    console.error('❌ Profile picture upload error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateProfilePicture
}; 