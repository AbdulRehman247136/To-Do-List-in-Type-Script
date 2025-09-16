import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const ConnectDB = async () => {
    console.log(process.env.Mongo_DB);
    try{

        await mongoose.connect(`${process.env.Mongo_DB}`);
        console.log("MongoDB connected Successfully");
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default ConnectDB;   