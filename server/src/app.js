import express from "express";
import router from "./routes/coins.routes.js";
import cors from "cors";
import config from "./config/config.js";

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

export default app;