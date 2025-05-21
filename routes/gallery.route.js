const express = require("express");
const router = express.Router();

const galleryController = require("../controllers/gallery.controller");
const galleryImageController = require("../controllers/galleryImage.controller");

// Get all images of a gallery (by id or name)
router.get("/images", galleryImageController.getGalleryImagesByGallery);

// Gallery routes
router.post("/", galleryController.createGallery);
router.get("/", galleryController.getAllGalleries);
router.get("/:id", galleryController.getGalleryById);
router.put("/:id", galleryController.updateGallery);
router.delete("/:id", galleryController.deleteGallery);

// GalleryImage routes
router.post("/image", galleryImageController.createGalleryImage);
router.get("/image/:id", galleryImageController.getGalleryImageById);
router.put("/image/:id", galleryImageController.updateGalleryImage);
router.delete("/image/:id", galleryImageController.deleteGalleryImage);

module.exports = router;
