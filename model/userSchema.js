import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniquie: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    cpassword: {
      type: String,
      required: true,
      minlength: 8,
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", schema);
export default UserModel;
