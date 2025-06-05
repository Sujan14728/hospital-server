const express = require("express");
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

const router = express.Router();
router.post("/", createNews);
router.get("/", getNews);
router.get("/:id", getNewsById);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
