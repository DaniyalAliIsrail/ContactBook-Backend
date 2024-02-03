import  express  from "express";
import "./db/connect.js"
import cors from "cors";
import router from "./routes/index.js";
// import dotenv from "./env"
// dotenv.config();
import { v2 as cloudinary } from 'cloudinary';


const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)

cloudinary.config({
  cloud_name: 'dih6gzzhk',
  api_key: '553388149965484',
  api_secret: '0umYW6KOYp9ZO4_1ZteptavElNY'
});
  
app.listen(PORT, () => {
    console.log(`Server Is Running On localhost:${PORT}`);
  });
