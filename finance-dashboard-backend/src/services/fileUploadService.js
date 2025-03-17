const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
require('dotenv').config();

// Configure AWS S3 Client (v3)
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Upload File to S3 (v3)
const uploadFileToS3 = async (file) => {
    try {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}_${file.originalname}`, // Unique file name
            Body: fileStream,
            ACL: 'private', // Change to "public-read" if you want public access
        };

        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Construct the S3 URL
        const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${uploadParams.Key}`;

        return fileUrl; // Returns file URL
    } catch (error) {
        console.error('S3 Upload Error:', error); // Log the error
        throw error; // Propagate the error to the caller
    }
};

module.exports = { uploadFileToS3 };