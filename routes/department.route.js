const express = require("express");
const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentBySlug,
} = require("../controllers/department.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");
const router = express.Router();

router.get("/", getAllDepartments);
router.get("/slug/:slug", getDepartmentBySlug);
router.get("/:id", getDepartmentById);
router.post("/", verifyAdmin, createDepartment);
router.put("/:id", verifyAdmin, updateDepartment);
router.delete("/:id", verifyAdmin, deleteDepartment);

module.exports = router;
