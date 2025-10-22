import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URL)
      console.log('DB connected successfully');
      
    }catch(error){
        console.log('BD error');
        
    }
}

export default connectDb