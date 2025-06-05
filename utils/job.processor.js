const batch = require("../models/batch.model");
const { getNextJob } = require("./queueManager");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processJob(job) {
  const pendingBatches = await batch.find({
    ingestion_id: job.ingestion_id,
    status: "yet to start"
  });

  for (const b of pendingBatches) {
    b.status = "triggered";
    await b.save();

    await delay(5000); 

    b.status = "completed";
    await b.save();
  }
}

function startProcessor() {
  setInterval(async () => {
    const job = getNextJob();
    if (job) await processJob(job);
  }, 5000);
}

module.exports = startProcessor;
