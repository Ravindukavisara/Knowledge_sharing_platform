// config/multerConfig.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "documents",
    resource_type: "auto", // This allows uploading different file types
  },
});

const upload = multer({ storage });
module.exports = upload;
