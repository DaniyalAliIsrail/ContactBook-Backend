import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index.js";
import { v2 as cloudinary } from 'cloudinary';
import env from "dotenv";
env.config();

const PORT = process.env.PORT || 8000;
const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://contactbook-manage.netlify.app'];
app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
  res.send('Express JS on Vercel')
})

cloudinary.config({
  cloud_name: 'dih6gzzhk',
  api_key: '553388149965484',
  api_secret: '0umYW6KOYp9ZO4_1ZteptavElNY'
});

const DB_URL = process.env.DB_URI;
mongoose.connect(DB_URL);
mongoose.connection.on("connected", () =>
  console.log("My MongoDB Is Connected"));
mongoose.connection.on("error", (err) => console.log("Error In MongoDb", err));




app.listen(PORT, () => {
    console.log(`Server Is Running On localhost:${PORT}`);
  });
