const express = require("express");
const { uploadImage, deleteImage } = require("../controllers/uploadController");
const protect = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", protect, upload.single("file"), uploadImage);
router.delete("/", protect, deleteImage);

module.exports = router;