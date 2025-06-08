const express = require("express");
const {
  deleteInquiry,
  createInquiry,
  getInquiryById,
  getAllInquiries,
  updateInquiry,
} = require("../controllers/inquiries.controller");
const router = express.Router();

router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.post("/", createInquiry);
router.put("/:id", updateInquiry);
router.delete("/:id", deleteInquiry);

module.exports = router;
