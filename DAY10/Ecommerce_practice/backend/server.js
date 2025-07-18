const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3001;
const dbName = "ECOMMERCE";

let db;

// ✅ Connect once and reuse the db
MongoClient.connect(process.env.MONGODB_URL)
  .then((client) => {
    console.log("✅ MongoDB connected");
    db = client.db(dbName);

    // ✅ Define routes only after DB connection
    app.get("/", async (req, res) => {
      try {
        const data = await db.collection("products").find().toArray(); // replace "products" with your collection name
        res.json(data);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
      }
    });

    // ✅ Start server after DB is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
