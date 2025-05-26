const express = require("express");
const {
  createPackage,
  getPackage,
} = require("../controllers/package.controller");

const router = express.Router();
router.post("/", createPackage);
router.get("/", getPackage);

module.exports = router;
