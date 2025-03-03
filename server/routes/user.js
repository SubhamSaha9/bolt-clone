const express = require("express");
const router = express.Router();
const { googleAuth, updateToken } = require("../controllers/authController");
const { auth } = require("../middleware/auth");

router.post("/google", googleAuth);
router.post("/update-token", auth, updateToken);

module.exports = router;