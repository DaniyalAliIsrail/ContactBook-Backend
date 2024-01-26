import  express  from "express";
import "./db/connect.js"
import cors from "cors";
import router from "./routes/index.js";
import dotenv from 'dotenv';



const PORT = process.env.PORT || 8000;
const app = express();


app.use(express.json());
app.use(cors());
app.use(router)
  
app.listen(PORT, () => {
    console.log(`Server Is Running On localhost:${PORT}`);
  });
