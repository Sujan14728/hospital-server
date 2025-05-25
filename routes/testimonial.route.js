const express = require("express");
const {
  createTestimonials,
  getTestimonials,
  getTestimonialsById,
} = require("../controllers/testimonial.controller");

const router = express.Router();
router.post("/", createTestimonials);
router.get("/", getTestimonials);
router.get("/:id", getTestimonialsById);

module.exports = router;
