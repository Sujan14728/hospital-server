const express = require("express");
const {
  createPackage,
  getPackage,
  getPackageById,
  updatePackage,
} = require("../controllers/package.controller");

const router = express.Router();
router.post("/", createPackage);
router.get("/", getPackage);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);

module.exports = router;
