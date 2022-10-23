import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import connect from './database/mongdb.js';
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from "dotenv";
import routes from "./router/index.js"

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

app.use("/",routes)

await connect();

app.listen(PORT , () => {
    console.log("Server is runing at http://localhost:4000 " );
});
