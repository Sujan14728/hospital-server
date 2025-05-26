const express = require("express");
const {
  createPackage,
  getPackage,
  getPackageById,
} = require("../controllers/package.controller");

const router = express.Router();
router.post("/", createPackage);
router.get("/", getPackage);
router.get("/:id", getPackageById);

module.exports = router;
