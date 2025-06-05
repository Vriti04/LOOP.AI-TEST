const Ingestion = require('../models/ingestion.model');
const Batch = require('../models/batch.model');

exports.batchStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const ingestion = await Ingestion.findOne({ ingest_id: id });
        if (!ingestion) return res.status(404).json("Id not found");

        const batches = await Batch.find({ ingestion_id: id });

        let outerStatus = 'yet_to_start';

        for (const b of batches) {
            if (b.status === 'triggered') {
                outerStatus = 'triggered';
                break;
            }
            if (b.status === 'completed' && outerStatus !== 'triggered') {
                outerStatus = 'completed';
            }
        }

        res.status(200).json({
            ingestion_id: id,
            status: outerStatus,
            batches: batches.map(b => ({
                batch_id: b.batch_id,
                ids: b.ids,
                status: b.status
            }))
        });

    } catch (err) {
        return res.status(500).json(err);
    }
}