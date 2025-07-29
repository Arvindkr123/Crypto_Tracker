import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), ".env"),
});

export default {
    MONGOURI: process.env.MONGOURI,
    PORT: process.env.PORT,
    CRYTPO_TRACKER_API: process.env.CRYTPO_TRACKER_API,
    BASE_URL_CRYPTO: process.env.BASE_URL_CRYPTO,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    BACKEND_URL_OWN:process.env.BACKEND_URL_OWN,
    CLIENT_WEBAPP_URL:process.env.CLIENT_WEBAPP_URL,
};
