const prisma = require("../config/database");

// Customer CRUD
exports.createCustomer = async (data) => {
  return await prisma.customer.create({ data });
};

exports.getCustomers = async () => {
  return await prisma.customer.findMany();
};

exports.getCustomerById = async (id) => {
  return await prisma.customer.findUnique({ where: { id } });
};

exports.updateCustomer = async (id, data) => {
  return await prisma.customer.update({ where: { id }, data });
};

exports.deleteCustomer = async (id) => {
  return await prisma.customer.delete({ where: { id } });
};

// Bill CRUD
exports.createBill = async (data) => {
  return await prisma.bill.create({ data });
};

exports.getBills = async () => {
  return await prisma.bill.findMany({ include: { customer: true } });
};

exports.updateBill = async (id, data) => {
  return await prisma.bill.update({ where: { id }, data });
};

exports.deleteBill = async (id) => {
  return await prisma.bill.delete({ where: { id } });
};

// Receipt CRUD
exports.createReceipt = async (data) => {
  return await prisma.receipt.create({ data });
};

exports.getReceipts = async () => {
  return await prisma.receipt.findMany();
};

// Purchase CRUD
exports.createPurchase = async (data) => {
  return await prisma.purchase.create({ data });
};

exports.getPurchases = async () => {
  return await prisma.purchase.findMany();
};

// Payment CRUD
exports.createPayment = async (data) => {
  return await prisma.payment.create({ data });
};

exports.getPayments = async () => {
  return await prisma.payment.findMany();
};
