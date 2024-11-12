// controllers/documentController.js
const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file.path; // Cloudinary URL
    const fileType = req.file.mimetype;

    const newDocument = new Document({
      title,
      description,
      fileUrl,
      fileType,
      uploadedBy: req.user.id,
    });

    await newDocument.save();
    res.status(201).json({ message: "Document uploaded successfully", document: newDocument });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Server error during document upload" });
  }
};



exports.searchDocuments = async (req, res) => {
    try {
      const { query } = req.query;
      const documents = await Document.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).json(documents);
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Server error during document search" });
    }
};