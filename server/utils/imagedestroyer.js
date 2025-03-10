const cloudinary = require('cloudinary').v2

exports.deleteImageFromCloudinary = async (secureUrl) => {
    const publicId = secureUrl.split('/').splice(-2).join("/").split('.')[0];

    return cloudinary.uploader.destroy(publicId);
}