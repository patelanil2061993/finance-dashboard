const request = require('supertest');
const app = require('../src/app'); // Import backend app
const fs = require('fs');
const path = require('path');

describe('File Upload API Tests', () => {
    test('Should return 400 if no file is uploaded', async () => {
        const response = await request(app).post('/api/files/upload');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No file uploaded');
    });

    test('Should upload a file and return file URL', async () => {
        const filePath = path.join(__dirname, 'testFile.txt');
        fs.writeFileSync(filePath, 'Sample file content');

        const response = await request(app)
            .post('/api/files/upload')
            .attach('file', filePath);

        expect(response.status).toBe(200);
        expect(response.body.fileUrl).toMatch(/https:\/\/avitech1\.s3\.amazonaws\.com/);
        fs.unlinkSync(filePath);
    });
});
