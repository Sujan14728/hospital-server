const express = require("express");
const {
  createAdministrativeStaff,
  getAdministrative,
  getAdministrativeById,
  updateAdministrative,
  deleteAdministrative,
} = require("../controllers/administrativestaff.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, createAdministrativeStaff);
router.get("/", getAdministrative);
router.get("/:id", getAdministrativeById);
router.put("/:id", verifyAdmin, updateAdministrative);
router.delete("/:id", verifyAdmin, deleteAdministrative);
module.exports = router;
