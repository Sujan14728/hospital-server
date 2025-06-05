const express = require("express");
const {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, createAdmin);
router.get("/", verifyAdmin, getAdmin);
router.post("/login", loginAdmin);
router.get("/:id", verifyAdmin, getAdminById);
router.put("/:id", verifyAdmin, updateAdmin);
router.delete("/:id", verifyAdmin, deleteAdmin);

module.exports = router;
