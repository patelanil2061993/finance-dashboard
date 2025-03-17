const multer = require('multer');
const { uploadFileToS3 } = require('../services/fileUploadService');
const fs = require('fs').promises; // Use promises for async file operations
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure Multer
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`); // Using UUID and original extension
    }
});

const upload = multer({ storage });

// Upload API Controller
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload file to AWS S3
        const fileUrl = await uploadFileToS3(req.file);

        // Cleanup temporary file
        await fs.unlink(req.file.path);

        // Return uploaded file URL
        res.status(200).json({ fileUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: error.message || "File upload failed" }); //send the error message.
    }
};

exports.uploadMiddleware = upload.single('file');