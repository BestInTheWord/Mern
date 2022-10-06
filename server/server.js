import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = 4000;
const app =  express();
app.use(cors);

 await mongoose.connect("mongodb+srv://Sanjay:sanju123@bitfumes-mern.zwxhdmc.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB connection is successful");

app.get("/" , (req, res) => {
    res.send("Hello world");
});

app.listen(PORT , () => {
   console.log("Server is runing at http://localhost:4000");
});
