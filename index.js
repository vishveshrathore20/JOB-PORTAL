import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './utils/db.js'
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(morgan('combined'));


app.use("/api/v1/user",userRoute);
app.use("api/v1/comapny",companyRoute)



const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));
app.get('/',(req,res)=>{
   return res.status(200).json({
    message:"Welcome to IITGJobs...",
    success:true
   })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT} `.bgBlue.white);
})


connectDB(process.env.MONGO_URL)