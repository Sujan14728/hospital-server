const express = require("express");
const {
  createContact,
  getContact,
  updateContact,
} = require("../controllers/contact.controller");

const router = express.Router();
router.post("/", createContact);
router.get("/", getContact);
router.put("/:id", updateContact);

module.exports = router;
