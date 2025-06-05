const express = require("express");
const {
  createSocialLink,
  getSocialLink,
  getSocialLinkById,
  updateSocialLink,
  deleteSocialLink,
} = require("../controllers/sociallink.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/", verifyAdmin, createSocialLink);
router.get("/", getSocialLink);
router.put("/:id", verifyAdmin, updateSocialLink);
router.get("/:id", getSocialLinkById);
router.delete("/:id", verifyAdmin, deleteSocialLink);

module.exports = router;
