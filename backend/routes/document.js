// routes/document.js
const express = require("express");
const { uploadDocument } = require("../controllers/documentController");
const { verifyToken } = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/upload", verifyToken, upload.single("document"), uploadDocument);

module.exports = router;


const { searchDocuments } = require("../controllers/documentController");

router.get("/search", verifyToken, searchDocuments);