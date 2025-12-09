import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});





connectDB()
.then(() => {

    app.on("error", (err) => {
        console.error("Failed to start server", err);
        throw err;
    });
    
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB !!!", err);
})


/*

//alternatve way without using separate db file

import express from "express";
const app = express();

(async () => {
    try{
       await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`);
       app.on("error", (err) => {
        console.error("Failed to start server", err);
        throw err;
       });

       app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
       });
    }
    catch(err){
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
})()

*/

