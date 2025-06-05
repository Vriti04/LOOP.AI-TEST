const express = require("express");
const mongoose = require("mongoose");
const ingestionRoutes = require("./routes/ingestion.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/", ingestionRoutes);

// Only start the server if this file is run directly
if (require.main === module) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      app.listen(5000, () => console.log("Server running on 5000"));
    })
    .catch(err => console.error(err));
}

module.exports = app;
