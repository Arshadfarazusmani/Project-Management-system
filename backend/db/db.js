import mongoose from "mongoose";
import { db_name } from "../constant.js";

// const DB_URI=process.env.MONGO_URI  -> cause error 

const connectDB= async function(){  // function definition 
   try{
    const connectionInstance= await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`)
    console.log("Database connected successfully to", connectionInstance.connection.name)
   }catch(error){

    
    


    console.log("DB connection Error !!!",error)
    process.exit(1);

   }
};


export {connectDB}