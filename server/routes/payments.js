const express = require("express");
const { capturePayment, verifyPayment } = require("../controllers/paymentController");
const { auth } = require("../middleware/auth");
const router = express.Router();

// razorpay gateway
router.post("/capture-payment", auth, capturePayment);
router.post("/verify-payment", auth, verifyPayment);

module.exports = router;