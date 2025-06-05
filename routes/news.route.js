const express = require("express");
const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
  updateNewsLikes,
  updateNewsViews,
} = require("../controllers/news.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();

router.post("/",verifyAdmin, createNews);
router.get("/", getNews);
router.get("/:id", getNewsById);
router.put("/:id",verifyAdmin, updateNews);
router.patch("/:id/likes", updateNewsLikes);
router.patch("/:id/views", updateNewsViews);
router.delete("/:id",verifyAdmin, deleteNews);

module.exports = router;
