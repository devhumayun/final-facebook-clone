import express from 'express'
import dotenv from 'dotenv';
import colors from 'colors';
import userRoute from './route/userRoute.js'
import { connectMongoDB } from './config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

// express init
const app = express();

// dotenv config
dotenv.config();

// Middle ware init
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors())

// environment variable init
const PORT = process.env.SERVER_PORT;

// users server
app.use('/api/v1/user', userRoute );


// custom error
app.use(errorHandler)

// server listener
app.listen( PORT, () =>  {
    connectMongoDB();
    console.log(`SERVER is runing on PORT : ${ PORT }`.bgGreen.black);
})

