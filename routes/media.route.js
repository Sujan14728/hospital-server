const express = require("express");
const {
  getAllMedia,
  getMediaById,
  getMediaBySection,
  createMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller");

const router = express.Router();

router.post("/", createMedia);
router.get("/", getAllMedia);
router.get("/section", getMediaBySection);
router.get("/:id", getMediaById);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

module.exports = router;
