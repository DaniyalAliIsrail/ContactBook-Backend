import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
    },
    contact: {
        type: Number,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      verifyUserId: {
        type: String,
      }
},
{ timestamps: true }
);

const CrudModel = mongoose.model("crud", schema);
export default CrudModel;