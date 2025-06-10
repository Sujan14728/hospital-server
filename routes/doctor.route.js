const express = require("express");
const {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpeciality,
  getDoctorsByDepartment,
} = require("../controllers/doctor.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");
const router = express.Router();

router.get("/", getAllDoctors);
router.get("/speciality", getDoctorsBySpeciality);
router.get("/department", getDoctorsByDepartment);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.put("/:id", verifyAdmin, updateDoctor);
router.delete("/:id", verifyAdmin, deleteDoctor);

module.exports = router;
