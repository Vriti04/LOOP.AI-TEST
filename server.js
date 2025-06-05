const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const startProcessor = require("./utils/job.processor");
const ingestionRoutes = require("./routes/ingestion.routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

startProcessor();
app.use("/", ingestionRoutes);
app.get('/', ()=>{
    console.log("Welcome to the Ingestion API");
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
