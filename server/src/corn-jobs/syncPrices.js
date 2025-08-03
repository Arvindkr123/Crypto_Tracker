import cron from 'node-cron';
import axios from 'axios';
import config from '../config/config.js';

export const startCron = () => {
  cron.schedule('* * * * *', async () => {
    try {
      await axios.post(`${config.BACKEND_URL_OWN}/api/history`);
      console.log("🕒 Synced at", new Date().toLocaleString());
    } catch (error) {
      console.error("❌ Cron Sync Error:", error.message);
    }
  });
  console.log("🟢 Cron job started (every hour)");
};
