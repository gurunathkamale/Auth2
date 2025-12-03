import mongoose from "mongoose"
// import { MONGO_URI } from "../config/env"


const dbConnect = async()=>{
    const MONGO_URI = process.env.MONGO_URI;
    try {
        if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }
        await mongoose.connect(MONGO_URI);
        // console.log("MONGO_URI =>", JSON.stringify(MONGO_URI));
        console.log('MongoDb connected successfully')

    } catch (error) {
        console.error('DB Error', error);
        process.exit(1);
    }
}

export default dbConnect