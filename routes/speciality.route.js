const express = require("express");
const {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getDoctorsBySpeciality,
} = require("../controllers/speciality.controller");
const router = express.Router();

router.get("/", getAllSpecialities);
router.get("/:id", getSpecialityById);
router.post("/", createSpeciality);
router.put("/:id", updateSpeciality);
router.delete("/:id", deleteSpeciality);

module.exports = router;
