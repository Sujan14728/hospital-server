const express = require("express");

const verifyAdmin = require("../middlewares/auth/verifyAdmin");
const {
  createSocialLinks,
  getSocialLinks,
  updateSocialLinks,
  getSocialLinksById,
  deleteSocialLinks,
} = require("../controllers/sociallink.controller");

const router = express.Router();

router.post("/", verifyAdmin, createSocialLinks);
router.get("/", getSocialLinks);
router.put("/:id", updateSocialLinks);
router.get("/:id", getSocialLinksById);
router.delete("/:id", verifyAdmin, deleteSocialLinks);

module.exports = router;
