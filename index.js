import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import rateLimit from "express-rate-limit";
import helmet from 'helmet';
import { MAX_JSON_SIZE, PORT, REQUEST_LIMIT_TIME, REQUEST_NUMBER, URL_ENCODE, WEB_CACHE } from "./app/configs/config.js";
import { connection } from "./app/postgres/postgres.js";
import router from "./routes/api.js";

const app = express();

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());
app.use(cookieParser());


const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_NUMBER})
app.use(limiter)

app.set('etag', WEB_CACHE)

app.use('/api', router)

app.listen(PORT, () =>{
    console.log("Server started")
})

connection();