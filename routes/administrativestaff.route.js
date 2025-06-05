const express = require("express");
const {
  createAdministrativeStaff,
  getAdministrative,
  getAdministrativeById,
  updateAdministrative,
} = require("../controllers/administrativestaff.controller");

const router = express.Router();

router.post("/", createAdministrativeStaff);
router.get("/", getAdministrative);
router.get("/:id", getAdministrativeById);
router.put("/:id", updateAdministrative);
module.exports = router;
