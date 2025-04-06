import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import ConnectDB from "./config/db.js";
ConnectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

const PORT = process.env.PORT || 5001;
app.listen(PORT, (req, res) => {
  console.log(`Server in Running on Port: ${PORT}`);
});
