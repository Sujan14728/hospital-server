const express = require("express");
const {
  createAdministrativeStaff,
  getAdministrative,
  getAdministrativeById,
  updateAdministrative,
  deleteAdministrative,
} = require("../controllers/administrativestaff.controller");

const router = express.Router();

router.post("/", createAdministrativeStaff);
router.get("/", getAdministrative);
router.get("/:id", getAdministrativeById);
router.put("/:id", updateAdministrative);
router.delete("/:id", deleteAdministrative);
module.exports = router;
