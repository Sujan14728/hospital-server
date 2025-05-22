const express = require("express");
const {
  createSocialLink,
  getSocialLink,
  updateSocialLink,
} = require("../controllers/sociallink.controller");

const router = express.Router();
router.post("/", createSocialLink);
router.get("/", getSocialLink);
router.put("/:id", updateSocialLink);

module.exports = router;
