const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();

// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Upload File to S3
const uploadFileToS3 = async (file) => {
    try {
        const fileStream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}_${file.originalname}`, // Unique file name
            Body: fileStream,
            ACL: "private", // Change to "public-read" if you want public access
        };

        const data = await s3.upload(uploadParams).promise();
        return data.Location; // Returns file URL
    } catch (error) {
        console.error("S3 Upload Error:", error); // Log the error
        throw error; // Propagate the error to the caller
    } 
};

module.exports = { uploadFileToS3 };