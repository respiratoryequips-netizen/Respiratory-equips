const express = require("express");
const { submitConsultation } = require("../controllers/contactController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.single("prescription"), submitConsultation);

module.exports = router;