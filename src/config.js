import { config } from "dotenv";

config();

export default {
    host: process.env.HOST || "",
    databse: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
};