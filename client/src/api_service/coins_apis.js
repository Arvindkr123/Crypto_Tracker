import axios from "axios"
const BASE_URL_CRYPTOBACKEND = import.meta.env.VITE_CRYPTO_BACKEND_URL;

export const getCoinstLists = async () => {
    try {
        const res = await axios.get(`${BASE_URL_CRYPTOBACKEND}/api/coins`);
        return res.data;
    } catch (error) {
        console.error("Error fetching coins:", error.message);
        throw error;
    }
};


export const getSpecificCoinHistory = async (coinId) => {
    try {
        const res = await axios.get(`${BASE_URL_CRYPTOBACKEND}/api/history/${coinId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching coins:", error.message);
        throw error;
    }
}