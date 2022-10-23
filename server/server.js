import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import TransactionsApi from './router/TransactionsApi.js';
import connect from './database/mongdb.js';
import AuthApi from './router/AuthApi.js';
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from "dotenv";
import UserApi from "./router/UserApi.js"

dotenv.config();

const PORT = 4000;
const app =  express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.get("/" , (req, res) => {
    res.send("Hello world");
});

app.use("/transaction",TransactionsApi);
app.use("/auth",AuthApi);
app.use("/user",UserApi);

await connect();

app.listen(PORT , () => {
    console.log("Server is runing at http://localhost:4000 " );
});
