const express = require("express");
const {
  getAllMedia,
  getMediaById,
  getMediaBySection,
  createMedia,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/",verifyAdmin, createMedia);
router.get("/", getAllMedia);
router.get("/section", getMediaBySection);
router.get("/:id", getMediaById);
router.put("/:id",verifyAdmin, updateMedia);
router.delete("/:id",verifyAdmin, deleteMedia);

module.exports = router;
