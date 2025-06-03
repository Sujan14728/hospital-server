const express = require("express");
const {
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contact.controller");

const router = express.Router();
router.post("/", createContact);
router.get("/", getContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
