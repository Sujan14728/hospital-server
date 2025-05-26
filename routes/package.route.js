const express = require("express");
const {
  createPackage,
  getPackage,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/package.controller");

const router = express.Router();
router.post("/", createPackage);
router.get("/", getPackage);
router.get("/:id", getPackageById);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
