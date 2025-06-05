const express = require("express");
const {
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");
const verifyAdmin = require("../middlewares/auth/verifyAdmin");

const router = express.Router();
router.post("/", verifyAdmin, createContact);
router.get("/", getContact);
router.put("/:id", verifyAdmin, updateContact);
router.delete("/:id", verifyAdmin, deleteContact);

module.exports = router;
