const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ secure: true });

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Interview Buddy/organisation-logos',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const parts = imageUrl.split('/');
    const filename = parts[parts.length - 1].split('.')[0];
    const publicId = `Interview Buddy/organisation-logos/${filename}`;
    await cloudinary.uploader.destroy(publicId);
    console.log('🗑️ Deleted:', publicId);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

module.exports = { upload, deleteFromCloudinary };
