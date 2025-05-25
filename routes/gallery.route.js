const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/gallery.controller");
const galleryImageController = require("../controllers/galleryImage.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

// Get all images of a gallery (by id or name)
router.get("/images", galleryImageController.getGalleryImagesByGallery);

// Gallery routes
router.post("/", verifyAdmin, galleryController.createGallery);
router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
router.put("/:id", verifyAdmin, galleryController.updateGallery);
router.delete("/:id", verifyAdmin, galleryController.deleteGallery);

// GalleryImage routes
router.post("/image", verifyAdmin, galleryImageController.createGalleryImage);
router.get("/image/:id", galleryImageController.getGalleryImageById);
router.put(
  "/image/:id",
  verifyAdmin,
  galleryImageController.updateGalleryImage
);
router.delete(
  "/image/:id",
  verifyAdmin,
  galleryImageController.deleteGalleryImage
);

module.exports = router;
