import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields Are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "User Already Exists",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields Are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
