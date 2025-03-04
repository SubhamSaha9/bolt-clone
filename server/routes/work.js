const express = require("express");
const router = express.Router();
const { createWorkSpace, getWorkSpace, updateWorkSpace, getAllWorkSpaces, deleteWorkSpace } = require("../controllers/workController");
const { auth } = require("../middleware/auth");

router.post("/create", auth, createWorkSpace);
router.post("/get", auth, getWorkSpace);
router.post("/update", auth, updateWorkSpace);
router.post("/delete", auth, deleteWorkSpace);
router.get("/get-all", auth, getAllWorkSpaces);

module.exports = router;