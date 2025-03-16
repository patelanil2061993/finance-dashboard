const express = require("express");
const financeController = require("../controllers/financeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Debugging Logs
console.log("Finance Controller Loaded:", financeController);

// Helper function to safely attach routes
const safeRoute = (method, path, middleware, controllerFunc) => {
    if (typeof controllerFunc === "function") {
        router[method](path, middleware, controllerFunc);
    } else {
        console.error(`Error: ${method.toUpperCase()} ${path} is not defined in financeController`);
    }
};

// ------------------ Customer Routes ------------------
safeRoute("post", "/customers", protect, financeController.createCustomer);
safeRoute("get", "/customers", protect, financeController.getCustomers);
safeRoute("get", "/customers/:id", protect, financeController.getCustomerById);
safeRoute("put", "/customers/:id", protect, financeController.updateCustomer);
safeRoute("delete", "/customers/:id", protect, financeController.deleteCustomer);

// ------------------ Bill Routes ------------------
safeRoute("post", "/bills", protect, financeController.createBill);
safeRoute("get", "/bills", protect, financeController.getBills);
safeRoute("get", "/bills/:id", protect, financeController.getBillById);
safeRoute("put", "/bills/:id", protect, financeController.updateBill);
safeRoute("delete", "/bills/:id", protect, financeController.deleteBill);

// ------------------ Receipt Routes ------------------
safeRoute("post", "/receipts", protect, financeController.createReceipt);
safeRoute("get", "/receipts", protect, financeController.getReceipts);
safeRoute("get", "/receipts/:id", protect, financeController.getReceiptById);
safeRoute("put", "/receipts/:id", protect, financeController.updateReceipt);
safeRoute("delete", "/receipts/:id", protect, financeController.deleteReceipt);

// ------------------ Purchase Routes ------------------
safeRoute("post", "/purchases", protect, financeController.createPurchase);
safeRoute("get", "/purchases", protect, financeController.getPurchases);
safeRoute("get", "/purchases/:id", protect, financeController.getPurchaseById);
safeRoute("put", "/purchases/:id", protect, financeController.updatePurchase);
safeRoute("delete", "/purchases/:id", protect, financeController.deletePurchase);

// ------------------ Payment Routes (Expenses) ------------------
safeRoute("post", "/payments", protect, financeController.createPayment);
safeRoute("get", "/payments", protect, financeController.getPayments);
safeRoute("get", "/payments/:id", protect, financeController.getPaymentById);
safeRoute("put", "/payments/:id", protect, financeController.updatePayment);
safeRoute("delete", "/payments/:id", protect, financeController.deletePayment);

// ------------------ Vendors Routes ------------------
safeRoute("post", "/vendors", protect, financeController.createVendor);
safeRoute("get", "/vendors", protect, financeController.getVendors);
safeRoute("get", "/vendors/:id", protect, financeController.getVendorById);
safeRoute("put", "/vendors/:id", protect, financeController.updateVendor);
safeRoute("delete", "/vendors/:id", protect, financeController.deleteVendor);

module.exports = router;