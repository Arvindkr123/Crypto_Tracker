import axios from "axios"
const BASE_URL_CRYPTOBACKEND = import.meta.env.VITE_CRYPTO_BACKEND_URL;


export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL_CRYPTOBACKEND}/api/auth/register`, formData);
        return res.data;
    } catch (error) {
        console.error("Error fetching coins:", error.message);
        throw error;
    }
}
export const loginUserApi = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL_CRYPTOBACKEND}/api/auth/login`, formData);
        return res.data;
    } catch (error) {
        console.error("Error fetching coins:", error.message);
        throw error;
    }
}
export const logoutUserApi = async () => {
    try {
        const res = await axios.post(`${BASE_URL_CRYPTOBACKEND}/api/auth/logout`, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error fetching coins:", error.message);
        throw error;
    }
}