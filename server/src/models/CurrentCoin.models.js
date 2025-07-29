import mongoose from 'mongoose';

const CurrentCoinSchema = new mongoose.Schema({
    coinId: String,
    name: String,
    symbol: String,
    price: Number,
    marketCap: Number,
    change24h: Number,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('CurrentCoin', CurrentCoinSchema);
