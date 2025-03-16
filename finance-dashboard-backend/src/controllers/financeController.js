const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// ✅ CRUD Operations for Customer
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, address, userId } = req.body;
  if (!name || !phone || !userId) {
    return res.status(400).json({ message: "Name, phone, and userId are required." });
  }
  try {
    const customer = await prisma.customer.create({ data: { name, email, phone, address, userId } });
    res.status(201).json({ message: "Customer created successfully", customer });
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error: error.message });
  }
});

const getCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
};

const getCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers", error: error.message });
  }
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.update({
      where: {
        id: id, // Corrected line
      },
      data: {
        name: "John Doe Updated",
        email: "john.updated@example.com",
        phone: "9876543211",
        address: "456 New Street",
      },
    });

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: {
        id: id, // Corrected line
      },
    });

    res.status(204).send(); // Send 204 No Content for successful deletion
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
});

// ✅ Create Vendor
const createVendor = asyncHandler(async (req, res) => {
  const { name, email, phone, address, userId } = req.body;

  if (!name || !phone || !userId) {
    return res.status(400).json({ message: "Name, phone, and userId are required." });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid userId. User does not exist." });
    }

    const vendor = await prisma.vendor.create({ // Change prisma.vendor.create to prisma.vendor.create
      data: {
        name,
        email,
        phone,
        address,
        userId: userId, // Remove Number(userId), userId is a string
      },
    });

    res.status(201).json({ message: "Vendor created successfully", vendor });
  } catch (error) {
    console.error("❌ Error creating vendor:", error);
    res.status(500).json({ message: "Error creating vendor", error: error.message });
  }
});

// ✅ Get All vendors
const getVendors = asyncHandler(async (req, res) => {
  try {
    const vendors = await prisma.vendor.findMany();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("❌ Error fetching vendors:", error);
    res.status(500).json({ message: "Error fetching vendors", error: error.message });
  }
});

// ✅ Get Single vendor by ID
const getVendorById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const vendor = await prisma.vendor.findUnique({ // Changed to vendor.findUnique
      where: {
        id: id, // Corrected line
      },
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json(vendor);
  } catch (error) {
    console.error('❌ Error fetching vendor:', error);
    res.status(500).json({ message: 'Error fetching vendor', error: error.message });
  }
});

// ✅ Update vendor
const updateVendor = asyncHandler(async (req, res) => {
  const { id } = req.params; // Get id from request parameters
  const { name, email, phone, address } = req.body;

  try {
    const vendor = await prisma.vendor.update({ // Changed to vendor.update
      where: {
        id: id, // Corrected line
      },
      data: {
        name: name, // use values from req.body
        email: email,
        phone: phone,
        address: address,
      },
    });

    res.status(200).json(vendor);
  } catch (error) {
    console.error("❌ Error updating vendor:", error);
    res.status(500).json({ message: "Error updating vendor", error: error.message });
  }
});

// ✅ Delete Vendor
const deleteVendor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.vendor.delete({ where: { id: id } });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting vendor:", error);
    res.status(500).json({ message: "Error deleting vendor", error: error.message });
  }
});

// ✅ CRUD operations for Bill

// Create Bill
const createBill = asyncHandler(async (req, res) => {
  const { amount, customerId, userId } = req.body;

  if (!amount || !customerId || !userId) {
    return res.status(400).json({ message: "Amount, customerId, and userId are required." });
  }

  try {
    const bill = await prisma.bill.create({ data: { amount, customerId, userId } });
    res.status(201).json({ message: "Bill created successfully", bill });
  } catch (error) {
    errorHandler(res, error, "Error creating bill");
  }
});

// Get All Bills
const getBills = asyncHandler(async (req, res) => {
  try {
    const bills = await prisma.bill.findMany();
    res.json(bills);
  } catch (error) {
    errorHandler(res, error, "Error fetching bills");
  }
});

// Get Bill by ID
const getBillById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const bill = await prisma.bill.findUnique({ where: { id: id, } });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.json(bill);
  } catch (error) {
    errorHandler(res, error, "Error fetching bill");
  }
});

// Update Bill
const updateBill = async (req, res) => {
  const { id } = req.params;
  const { amount, date, customerId, userId } = req.body; // Extract updated data

  try {
    const updatedBill = await prisma.bill.update({
      where: {
        id: id,
      },
      data: {
        amount: amount ? parseFloat(amount) : undefined, // Update if provided
        date: date ? new Date(date) : undefined,
        customerId: customerId,
        userId: userId,
      },
    });

    res.status(200).json(updatedBill);
  } catch (error) {
    console.error('Error updating bill:', error);
    errorHandler(error, req, res);
  }
};

// Delete Bill
const deleteBill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.bill.delete({ where: { id: id, } });
    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    errorHandler(res, error, "Error deleting bill");
  }
});

// ✅ CRUD operations for Receipt

// Create Receipt
const createReceipt = asyncHandler(async (req, res) => {
  const { amount, customerId, userId } = req.body;

  if (!amount || !customerId || !userId) {
    return res.status(400).json({ message: "Amount, customerId, and userId are required." });
  }

  try {
    const receipt = await prisma.receipt.create({ data: { amount, customerId, userId } });
    res.status(201).json({ message: "Receipt created successfully", receipt });
  } catch (error) {
    errorHandler(res, error, "Error creating receipt");
  }
});

// Get All Receipts
const getReceipts = asyncHandler(async (req, res) => {
  try {
    const receipts = await prisma.receipt.findMany();
    res.json(receipts);
  } catch (error) {
    errorHandler(res, error, "Error fetching receipts");
  }
});

// Get Receipt by ID
const getReceiptById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const receipt = await prisma.receipt.findUnique({ where: { id: id, } });
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }
    res.json(receipt);
  } catch (error) {
    errorHandler(res, error, "Error fetching receipt");
  }
});

// Update Receipt
const updateReceipt = async (req, res) => {
  const { id } = req.params;
  const { amount, date, customerId, userId } = req.body;

  try {
    const updatedReceipt = await prisma.receipt.update({
      where: {
        id: id,
      },
      data: {
        amount: amount ? parseFloat(amount) : undefined,
        date: date ? new Date(date) : undefined,
        customerId: customerId,
        userId: userId,
      },
    });

    res.status(200).json(updatedReceipt);
  } catch (error) {
    console.error('Error updating receipt:', error);
    errorHandler(error, req, res); // Use errorHandler to handle errors
  }
};

// Delete Receipt
const deleteReceipt = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.receipt.delete({ where: { id: id,} });
    res.json({ message: "Receipt deleted successfully" });
  } catch (error) {
    errorHandler(res, error, "Error deleting receipt");
  }
});

// ✅ CRUD operations for Purchase

// Create Purchase
const createPurchase = asyncHandler(async (req, res) => {
  const { amount, date, vendorId, userId } = req.body;

  if (!amount || !date || !vendorId || !userId) {
    return res.status(400).json({ message: "Amount, date, vendorId, and userId are required." });
  }

  try {
    const purchase = await prisma.purchase.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        vendorId,
        userId,
      },
    });

    res.status(201).json({ message: "Purchase created successfully", purchase });
  } catch (error) {
    console.error("❌ Error creating purchase:", error);
    errorHandler(error, req, res); // Use errorHandler to handle errors
  }
});

// Get All Purchases
const getPurchases = asyncHandler(async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany();
    res.json(purchases);
  } catch (error) {
    errorHandler(res, error, "Error fetching purchases");
  }
});

// Get Purchase by ID
const getPurchaseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await prisma.purchase.findUnique({ where: { id: id, } });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.json(purchase);
  } catch (error) {
    errorHandler(res, error, "Error fetching purchase");
  }
});

// Update Purchase
const updatePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, date, vendorId, userId } = req.body;

  try {
    const updatedPurchase = await prisma.purchase.update({
      where: {
        id: id,
      },
      data: {
        amount: amount ? parseFloat(amount) : undefined,
        date: date ? new Date(date) : undefined,
        vendorId: vendorId,
        userId: userId,
      },
    });

    res.status(200).json(updatedPurchase);
  } catch (error) {
    console.error('❌ Error updating purchase:', error);
    errorHandler(error, req, res); // Use errorHandler to handle errors
  }
});

// Delete Purchase
const deletePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.purchase.delete({ where: { id: id, } });
    res.json({ message: "Purchase deleted successfully" });
  } catch (error) {
    errorHandler(res, error, "Error deleting purchase");
  }
});

// ✅ CRUD operations for Payment

// Create Payment
const createPayment = asyncHandler(async (req, res) => {
  const { amount, date, vendorId, userId } = req.body;

  if (!amount || !date || !vendorId || !userId) {
    return res.status(400).json({ message: "Amount, date, vendorId, and userId are required." });
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        vendorId,
        userId,
      },
    });

    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error("❌ Error creating payment:", error);
    errorHandler(error, req, res); // Use errorHandler to handle errors
  }
});

// Get All Payments
const getPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    errorHandler(res, error, "Error fetching payments");
  }
});

// Get Payment by ID
const getPaymentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await prisma.payment.findUnique({ where: { id: id, } });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    errorHandler(res, error, "Error fetching payment");
  }
});

// Update Payment
const updatePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, date, vendorId, userId } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: {
        id: id,
      },
      data: {
        amount: amount ? parseFloat(amount) : undefined,
        date: date ? new Date(date) : undefined,
        vendorId: vendorId,
        userId: userId,
      },
    });

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error('❌ Error updating payment:', error);
    errorHandler(error, req, res); // Use errorHandler to handle errors
  }
});

// Delete Payment
const deletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.payment.delete({ where: { id: id, } });
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    errorHandler(res, error, "Error deleting payment");
  }
});

exports.getCustomerById = async (req, res) => {
  try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
          return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json(customer);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving customer", error });
  }
};

exports.getBillById = async (req, res) => {
  try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) {
          return res.status(404).json({ message: "Bill not found" });
      }
      res.status(200).json(bill);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving bill", error });
  }
};

exports.getReceiptById = async (req, res) => {
  try {
      const receipt = await Receipt.findById(req.params.id);
      if (!receipt) {
          return res.status(404).json({ message: "Receipt not found" });
      }
      res.status(200).json(receipt);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving receipt", error });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
      const purchase = await Purchase.findById(req.params.id);
      if (!purchase) {
          return res.status(404).json({ message: "Purchase not found" });
      }
      res.status(200).json(purchase);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving purchase", error });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
      const payment = await Payment.findById(req.params.id);
      if (!payment) {
          return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving payment", error });
  }
};

exports.getVendorById = async (req, res) => {
  try {
      const vendor = await Vendor.findById(req.params.id);
      if (!vendor) {
          return res.status(404).json({ message: "Vendor not found" });
      }
      res.status(200).json(vendor);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving vendor", error });
  }
};


module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  createVendor,
  getVendors,
  updateVendor,
  deleteVendor,
  createBill,
  getBills,
  updateBill,
  deleteBill,
  createReceipt,
  getReceipts,
  updateReceipt,
  deleteReceipt,
  createPurchase,
  getPurchases,
  updatePurchase,
  deletePurchase,
  createPayment,
  getPayments,
  updatePayment,
  deletePayment,
  getCustomerById,  // Newly added functions
  getBillById,
  getReceiptById,
  getPurchaseById,
  getPaymentById,
  getVendorById
};
