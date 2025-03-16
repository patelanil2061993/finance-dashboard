const app = require("./app");  // Import app.js
const prisma = require("./config/database"); // Ensure database is connected

const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting the server:", error);
    process.exit(1);
  }
};

startServer();