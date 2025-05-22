const express = require("express");
const { createNews } = require("../controllers/news.controller");

const router = express.Router();
router.post("/", createNews);

module.exports = router;
