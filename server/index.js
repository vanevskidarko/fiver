import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from "./Routes/UserRoute.js";
import gigRoute from "./Routes/GigRoute.js"
import messageRoute from "./Routes/MessageRoute.js"
import orderRoute from "./Routes/OrderRoute.js"
import reviewRoute from "./Routes/ReviewRoute.js"
import conversationRoute from "./Routes/ConversationRoute.js"
import authRoute from "./Routes/AuthRoute.js"
import cookieParser from "cookie-parser";
import cors  from "cors";
import multer from 'multer';
import cloudinary from 'cloudinary';


const app = express()
dotenv.config()
mongoose.set('strictQuery',true)


cloudinary.v2.config({
    cloud_name: 'doerfg7sa',
    api_key: '689292518473591',
    api_secret: 'URjqHZhiVSYb9NnP2ASILRY9H-o'
  });
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  

const connect = async ()=>{
    try {
        mongoose.connect(process.env.mongo)
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}

app.use(cors({origin: "http://localhost:5173",credentials: true}));
  
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/conversations", conversationRoute);



app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' }, (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return res.status(500).send('Error uploading to Cloudinary.');
        }
    
        console.log('File uploaded to Cloudinary:', result);
        return res.status(200).send('File uploaded successfully.');
      }).end(req.file.buffer);
    });


// error handliong
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).send(errorMessage)
})


app.listen(8800,()=>{
    connect()
    console.log("test")
})