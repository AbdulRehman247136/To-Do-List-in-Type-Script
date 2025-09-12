import mongoose from "mongoose";


const ConnectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("MongoDB connected Successfully");
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default ConnectDB;   