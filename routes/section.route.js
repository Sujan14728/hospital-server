const express = require("express");
const {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, createSection);
router.get("/", getAllSections);
router.get("/:id", getSectionById);
router.put("/:id", verifyAdmin, updateSection);
router.delete("/:id", verifyAdmin, deleteSection);

module.exports = router;
