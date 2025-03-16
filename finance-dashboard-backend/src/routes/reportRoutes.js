const express = require('express');
const { getReport } = require('../controllers/reportController');
const router = express.Router();

router.get('/:type/:period', getReport);  // Example: GET /api/reports/sales/weekly

module.exports = router;
