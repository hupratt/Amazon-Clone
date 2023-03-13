import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// require('dotenv').config({ path: '.env' });

dotenv.config();

const app = express()
const port = process.env.PORT || 5000;
const connection_url = process.env.MONGO_URL;

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.use(express.json());
app.use(cors());



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/build/index.html'))
    })
}

// Listening to  server

app.listen(port,()=>console.log(`Listening on local host:${port}`))
