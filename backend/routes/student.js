const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadDocument, publishDocument, searchDocuments } = require("../controllers/studentController");
const { verifyToken } = require("../middleware/authMiddleware");

const upload = multer({ dest: "uploads/" });

router.post("/upload", verifyToken, upload.single("document"), uploadDocument);
router.post("/publish/:id", verifyToken, publishDocument);
router.get("/search", searchDocuments);

module.exports = router;
