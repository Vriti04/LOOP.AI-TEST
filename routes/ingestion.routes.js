const express = require("express");
const router = express.Router();
const ingestionController = require("../controllers/ingest.controller");
const batchController = require("../controllers/batch.controller");

router.post("/ingest", ingestionController.ingest);

router.get("/status/:id", batchController.batchStatus);

module.exports = router;
