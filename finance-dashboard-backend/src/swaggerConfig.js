const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Upload API',
            version: '1.0.0',
            description: 'API for uploading and storing files on AWS S3',
        },
        servers: [{ url: 'http://localhost:5000' }],
    },
    apis: ['./src/routes/*.js'], // Path to API routes
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
