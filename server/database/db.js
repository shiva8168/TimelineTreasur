import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;


 const Connection=async(username,password)=>{
// const URL=`mongodb://${username}:${password}@ac-oyyqv93-shard-00-00.emlfa2a.mongodb.net:27017,ac-oyyqv93-shard-00-01.emlfa2a.mongodb.net:27017,ac-oyyqv93-shard-00-02.emlfa2a.mongodb.net:27017/?ssl=true&replicaSet=atlas-dlptfn-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const URL="mongodb://localhost:27017/newone"
   const URL = `mongodb+srv://${username}:${password}@b-app.silgjtu.mongodb.net/?retryWrites=true&w=majority`
    try{

       await mongoose.connect(URL,{useNewUrlParser:true});
       console.log('Database connected successfully')
    }catch(error){
        console.log('Error while connecting with the database', error.message);
    }
}
export default Connection; 