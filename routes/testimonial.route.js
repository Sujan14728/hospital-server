const express = require("express");
const {
  createTestimonials,
  getTestimonials,
} = require("../controllers/testimonial.controller");

const router = express.Router();
router.post("/", createTestimonials);
router.get("/", getTestimonials);

module.exports = router;
