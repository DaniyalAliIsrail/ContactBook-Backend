import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://daniyalali12568:252688@cluster0.iaoztmq.mongodb.net/?retryWrites=true&w=majority`)
mongoose.connection.on("connected", () =>
  console.log("My MongoDB Is Connected")
);
mongoose.connection.on("error", (err) => console.log("Error In MongoDb", err));