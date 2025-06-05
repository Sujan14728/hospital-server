const express = require("express");
const {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/package.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");
const router = express.Router();

router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.post("/",verifyAdmin, createPackage);
router.put("/:id",verifyAdmin, updatePackage);
router.delete("/:id",verifyAdmin, deletePackage);

module.exports = router;
