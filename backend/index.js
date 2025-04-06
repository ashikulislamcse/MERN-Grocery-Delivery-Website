import express from 'express'
import dotenv, { config } from 'dotenv'
dotenv.config();

const app = express();





const PORT = process.env.PORT || 5001
app.listen(PORT, (req, res)=>{
    console.log(`Server in Running on Port: ${PORT}`);
})