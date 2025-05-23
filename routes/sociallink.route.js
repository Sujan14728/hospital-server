const express = require("express");
const {
  createSocialLink,
  getSocialLink,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink,
} = require("../controllers/sociallink.controller");

const router = express.Router();
router.post("/", createSocialLink);
router.get("/", getSocialLink);
router.get("/:id", getSocialLinkById);
router.put("/:id", updateSocialLink);
router.delete("/:id", deleteSocialLink);

module.exports = router;
