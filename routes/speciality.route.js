const express = require("express");
const {
  getAllSpecialities,
  getSpecialityById,
  createSpeciality,
  updateSpeciality,
  deleteSpeciality,
  getDoctorsBySpeciality,
} = require("../controllers/speciality.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");
const router = express.Router();

router.get("/", getAllSpecialities);
router.get("/:id", getSpecialityById);
router.post("/",verifyAdmin, createSpeciality);
router.put("/:id",verifyAdmin, updateSpeciality);
router.delete("/:id",verifyAdmin, deleteSpeciality);

module.exports = router;
