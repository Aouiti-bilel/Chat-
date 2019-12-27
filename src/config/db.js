import mongoose from 'mongoose'
const db = "mongodb+srv://bilel:bilel123@chat-mv217.mongodb.net/test?retryWrites=true&w=majority"
   

const connectDB = async () =>{
   try {
  await   mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
  });
  console.log('Mongo DB Connected !! ')
   } catch (err) {
      console.log(err.message);
      process.exit(1)}
   }

   
   
export default connectDB