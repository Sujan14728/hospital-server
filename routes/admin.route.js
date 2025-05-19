const express = require("express");
const { getAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.get("/", getAdmin);

module.exports = router;
