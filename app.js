import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import { v2 as cloudinary } from 'cloudinary';
import env from "dotenv"
env.config()

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

cloudinary.config({
  cloud_name:process.env.CLOUD_N,
  api_key:process.env.API_K,
  api_secret:process.env.API_SECRET,
});
console.log(process.env.CLOUD_N);
console.log(process.env.API_K);
console.log(process.env.API_SECRET);
console.log(process.env.DB_URI);




mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () =>
  console.log("My MongoDB Is Connected")
);
mongoose.connection.on("error", (err) => console.log("Error In MongoDb", err));
  
app.listen(PORT, () => {
    console.log(`Server Is Running On localhost:${PORT}`);
  });
