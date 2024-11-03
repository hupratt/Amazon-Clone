import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import imageRouter from './routers/imageRouter.js'
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

const corsOption = {
    credentials: true,
    origin: ['http://localhost:8966', 'http://amazon-backend:8966', 'http://172.190.4.1:8966', 'http://127.0.0.1:8966','http://localhost:8965', 'http://amazon-backend:8965', 'http://172.190.4.1:8965', 'http://127.0.0.1:8965']
}

app.use(cors(corsOption));


app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/upload", imageRouter);
app.use("/api/orders", orderRouter);
app.get('/api/config/paypal', (req,res)=>{
    res.send(process.env.REACT_APP_PAYPAL_CLIENT_ID || 'sb');
})
app.use("/pictures", express.static('public/pictures'))

if (process.env.NODE_ENV === 'production') {
    app.use("/static", express.static('public/build/static'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/build/index.html'))
    })
}

// Listening to  server

app.listen(port,()=>console.log(`Listening on localhost:${port}`))
