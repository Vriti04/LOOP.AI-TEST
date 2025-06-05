const Ingestion = require('../models/ingestion.model');
const Batch = require('../models/batch.model');
const { v4: uuidv4 } = require('uuid');
const { addToQueue } = require('../utils/queueManager');

exports.ingest = async (req, res) => {
  try {
    const { ids, priority } = req.body;

    if (!Array.isArray(ids) || ids.some(id => typeof id !== "number") || !["HIGH", "MEDIUM", "LOW"].includes(priority)) {
      return res.status(400).json({ error: "invalid id or priority, please check" });
    }

    const ingestion_id = uuidv4();
    const ingestion = new Ingestion({ ingest_id: ingestion_id, priority });
    await ingestion.save();


    const batchDocs = [];
    for (let i = 0; i < ids.length; i += 3) {
      batchDocs.push(new Batch({
        batch_id: uuidv4(),
        ingestion_id, 
        ids: ids.slice(i, i + 3),
      }));
    }

    await Batch.insertMany(batchDocs);


    addToQueue({ ingestion_id, priority });

    res.status(200).json({ ingestion_id });
  } catch (err) {
    console.error("Error in ingest:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
