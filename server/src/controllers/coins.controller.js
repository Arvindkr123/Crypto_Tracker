import axios from "axios"
import configDotenv from "../config/config.js"
import CurrentCoinModels from "../models/CurrentCoin.models.js";
import CoinHistoryModels from "../models/CoinHistory.models.js";

export const getCoinsDataController = async (req, res) => {
    try {
        const coins = await CurrentCoinModels.find({});
        res.status(200).send(coins)
    } catch (error) {
        console.error("CoinGecko API Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const postHistory = async (req, res) => {
  try {
    const { data } = await axios.get(
      configDotenv.BASE_URL_CRYPTO +
        "/api/v3/coins/markets?vs_currency=usd&order"
    );

    // Clear current snapshot
    await CurrentCoinModels.deleteMany();

    // Prepare current docs
    const currentDocs = data.map((coin) => ({
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      marketCap: coin.market_cap,
      change24h: coin.price_change_percentage_24h,
      timestamp: new Date(), // add snapshot timestamp
    }));

    // Insert into Current collection
    await CurrentCoinModels.insertMany(currentDocs);

    // Fetch back as plain JSON for history
    const historyDocs = await CurrentCoinModels.find({}).lean();

    // Insert into History collection
    await CoinHistoryModels.insertMany(historyDocs);

    res.status(201).json({ message: "Data synced successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error storing data", error: error.message });
  }
};


export const getCoinHistoryData = async (req, res) => {
    try {
        const { coinId } = req.params;
        const data =await CoinHistoryModels.findById(coinId)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ message: "Error storing data", error: error.message });
    }
};