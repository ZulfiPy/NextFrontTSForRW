var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
let connected = false;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose.set('strictQuery', true);
    // If the DB is already connected, do not connect again
    if (connected) {
        console.log('MongoDB is already connected.');
        return;
    }
    const mongoDBURI = process.env.MONGODB_URI;
    // Connect to MongoDB
    try {
        yield mongoose.connect(mongoDBURI);
        connected = true;
        console.log('MongoDB connected...');
    }
    catch (error) {
        console.log('error while connecting to the MongoDB', error);
    }
});
export default connectDB;
