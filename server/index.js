import app from "./src/app.js";
import dotenvData from "./src/config/config.js";
import { startCron } from "./src/corn-jobs/syncPrices.js";
import connectToDBHandler from "./src/utils/Connection.js";

connectToDBHandler()
  .then(() => {
    app.listen(dotenvData.PORT, () => {
      console.log('✅ Server running on port', dotenvData.PORT);
      startCron(); 
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });
