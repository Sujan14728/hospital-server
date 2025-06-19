const express = require("express");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getServiceBySlug,
} = require("../controllers/services.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.get("/", getAllServices);
router.get("/slug/:slug", getServiceBySlug);
router.get("/:id", getServiceById);
router.post("/",verifyAdmin, createService);
router.put("/:id",verifyAdmin, updateService);
router.delete("/:id",verifyAdmin, deleteService);

module.exports = router;
