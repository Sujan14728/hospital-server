const express = require("express");
const {
  createTestimonials,
  getTestimonials,
  getTestimonialsById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial.controller");

const router = express.Router();
router.post("/", createTestimonials);
router.get("/", getTestimonials);
router.get("/:id", getTestimonialsById);
router.put("/:id", updateTestimonial);
router.delete("/:id", deleteTestimonial);

module.exports = router;
