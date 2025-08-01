import config from "./src/config/config.js";
import dotenvData from "./src/config/config.js";
import { startCron } from "./src/corn-jobs/syncPrices.js";
import router from "./src/routes/coins.routes.js";
import connectToDBHandler from "./src/utils/Connection.js";
import express from "express"
import cors from "cors";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: config.CLIENT_WEBAPP_URL,
  credentials: true
}));

app.use("/welcome", (req, res) => {
  res.send(200).json({
    success: true,
    message: 'Welcome to Crypto Tracker App'
  })
})

app.use("/api", router)

connectToDBHandler()
  .then(() => {
    app.listen(dotenvData.PORT, () => {
      console.log('✅ Server running on port', dotenvData.PORT);
      // startCron();
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });
