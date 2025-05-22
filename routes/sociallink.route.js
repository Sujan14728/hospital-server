const express = require("express");
const {
  createSocialLink,
  getSocialLink,
} = require("../controllers/sociallink.controller");

const router = express.Router();
router.post("/", createSocialLink);
router.get("/", getSocialLink);

module.exports = router;
