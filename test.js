const request = require("supertest");
const app = require("./app");
const mongoose = require("mongoose");

let ingestionId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Simple API Tests", () => {
  test("POST /ingest with valid data should return ingestion_id", async () => {
    const res = await request(app)
      .post("/ingest")
      .send({ ids: [1, 2, 3, 4, 5], priority: "HIGH" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ingestion_id");
    ingestionId = res.body.ingestion_id;
  });

  test("GET /status/:id should return ingestion status", async () => {
    const res = await request(app).get(`/status/${ingestionId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ingestion_id", ingestionId);
    expect(res.body).toHaveProperty("status");
    expect(Array.isArray(res.body.batches)).toBe(true);
  });
});
