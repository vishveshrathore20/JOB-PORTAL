import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async (url) =>{
    try {
        await mongoose.connect(url);
        console.log(`Connected to the Database and welcome .. `.bgRed.black)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;