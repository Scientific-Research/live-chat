import mongoose from "mongoose";
// const uri = process.env.URI
// const uri =
//   "mongodb+srv://Maximilian:LIUQheTwXtdWYmqm@cluster0.xxnehhw.mongodb.net/messenger?retryWrites=true&w=majority";
const databaseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongodb Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default databaseConnect;
