const express = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceBySlug,
} = require("../controllers/services.controller");

const router = express.Router();

router.get("/", getAllServices);
router.get("/slug/:slug", getServiceBySlug);
router.get("/:id", getServiceById);
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
