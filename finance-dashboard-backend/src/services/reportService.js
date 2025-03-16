const prisma = require('../config/database');
const redisClient = require('../config/redis');

async function getAggregatedReport(type, period) {
  const cacheKey = `report:${type}:${period}`;

  // Check Redis Cache First
  try{
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error("Redis Cache error", error);
  }

  let filter = {};
  const today = new Date();

  // Set Date Range for Queries
  if (period === 'weekly') {
    filter = { date: { gte: new Date(today.setDate(today.getDate() - 7)) } };
  } else if (period === 'monthly') {
    filter = { date: { gte: new Date(today.setMonth(today.getMonth() - 1)) } };
  } else if (period === 'yearly') {
    filter = { date: { gte: new Date(today.setFullYear(today.getFullYear() - 1)) } };
  }

  let result;
  if (type === 'sales') {
    result = await prisma.bill.aggregate({
      _sum: { amount: true },
      where: filter,
    });
  } else if (type === 'revenue') {
    result = await prisma.receipt.aggregate({
      _sum: { amount: true },
      where: filter,
    });
  } else if (type === 'purchases') {
    result = await prisma.purchase.aggregate({
      _sum: { amount: true },
      where: filter,
    });
  } else if (type === 'payments') {
    result = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: filter,
    });
  }

  // Store in Redis Cache (Expire in 1 hour)
  try{
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 3600 });
  } catch(error){
    console.error("Redis Cache set error", error);
  }

  return result;
}

module.exports = { getAggregatedReport };