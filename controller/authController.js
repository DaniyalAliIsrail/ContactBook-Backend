import UserModel from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRETKEY = process.env.PRIVATE_KEY;

const SignupController = async (req, res) => {
  const { fname, email, password, cpassword } = req.body;

  if (!fname || !email || !password || !cpassword) {
    return res.status(400).json({
      status: false,
      message: "Required Fields Are Missing!",
      data: null,
    });
  }

  try {
    const exsistinguser = await UserModel.findOne({ email: email });
    if (exsistinguser) {
      return res.status(400).json({
        status: false,
        message: "Email is already in use!",
        data: null,
      });
    } else if (password !== cpassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match",
        data: null,
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        full_name: fname,
        email: email,
        password: hashPassword,
        cpassword: hashPassword,
      });

      const savedUser = await newUser.save();
      return res.status(200).json({
        status: true,
        message: "User registered successfully",
        data: savedUser,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "Internal Server Error",
      data: null,
    });
  }
};

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Required fiels are missing",
      data: "null",
    });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
        data: "null",
      });
    }

    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      return res.status(400).json({
        status: 400,
        message: "Invalid password",
        data: "null",
      });
    }
    console.log("SECRETKEY:", SECRETKEY);
    let token = jwt.sign({ email: userExist.email }, "mom");
    return res.status(200).json({
      status: 200,
      message: "User logged in successfully",
      data: userExist,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Internal Server Error",
      data: "null",
    });
  }
};

export { SignupController, LoginController };
