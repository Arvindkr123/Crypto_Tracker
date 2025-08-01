import express from "express";
import cors from "cors";
import config from "./src/config/config.js";
import { startCron } from "./src/corn-jobs/syncPrices.js";
import router from "./src/routes/coins.routes.js";
import connectToDBHandler from "./src/utils/Connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.CLIENT_WEBAPP_URL,
  credentials: true
}));

// Welcome route
app.get("/welcome", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Crypto Tracker App"
  });
});

// API routes
app.use("/api", router);

// --- For Local Development ---
if (process.env.VERCEL !== "1") {
  connectToDBHandler()
    .then(() => {
      app.listen(config.PORT, () => {
        console.log(`✅ Server running on http://localhost:${config.PORT}`);
        // startCron(); // enable if you want cron jobs locally
      });
    })
    .catch((err) => {
      console.error("❌ DB connection failed:", err);
    });
}

// --- For Vercel (Serverless) ---
export default app;
