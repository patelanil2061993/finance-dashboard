const express = require('express');
const { uploadFile, uploadMiddleware } = require('../controllers/fileUploadController');

const router = express.Router();

/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Upload a file
 *     description: Uploads a file and stores it in AWS S3.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fileUrl:
 *                   type: string
 *                   example: "https://s3.amazonaws.com/my-app-uploads/sample.pdf"
 *       400:
 *         description: No file uploaded
 */
router.post('/upload', uploadMiddleware, uploadFile);

module.exports = router;
