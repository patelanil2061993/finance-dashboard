const { getAggregatedReport } = require('../services/reportService');

exports.getReport = async (req, res) => {
    try {
        const { type, period } = req.params;
        if (!["sales", "revenue", "purchases", "payments"].includes(type) || 
            !["weekly", "monthly", "yearly"].includes(period)) {
            return res.status(400).json({ error: "Invalid report type or period" });
        }

        const reportData = await getAggregatedReport(type, period);
        res.status(200).json(reportData);
    } catch (error) {
        console.error("Report API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
