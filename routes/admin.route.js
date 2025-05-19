const express = require("express");
const {
  getAdmin,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/", createAdmin);
router.get("/", getAdmin);
router.post("/login", loginAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
