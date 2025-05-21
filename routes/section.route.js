const express = require("express");
const {
  getAllSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section.controller");

const router = express.Router();

router.post("/", createSection);
router.get("/", getAllSections);
router.get("/:id", getSectionById);
router.put("/:id", updateSection);
router.delete("/:id", deleteSection);

module.exports = router;
