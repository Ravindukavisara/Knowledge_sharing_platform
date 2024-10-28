const Document = require("../models/Document");
const User = require("../models/User");

// Upload Document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file.path;
    const newDocument = new Document({
      title,
      description,
      filePath,
      uploadedBy: req.user.id,
    });
    await newDocument.save();
    res.status(201).json("Document uploaded successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Publish Document
exports.publishDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (document.uploadedBy.toString() !== req.user.id) {
      return res.status(401).json("You can only publish your own documents");
    }
    document.published = true;
    await document.save();
    res.status(200).json("Document published successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Search Documents
exports.searchDocuments = async (req, res) => {
  try {
    const { query } = req.query;
    const documents = await Document.find({ title: { $regex: query, $options: "i" }, published: true });
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json(err);
  }
};
