const express = require("express");
const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");
const app = require("./app.js");
const prisma = new PrismaClient();
dotenv.config();
const port = process.env.PORT || 5000;
async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
