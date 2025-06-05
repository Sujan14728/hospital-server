const express = require("express");
const {
  createTestimonials,
  getTestimonials,
  getTestimonialsById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, createTestimonials);
router.get("/", getTestimonials);
router.get("/:id", getTestimonialsById);
router.put("/:id", verifyAdmin, updateTestimonial);
router.delete("/:id", verifyAdmin, deleteTestimonial);

module.exports = router;
