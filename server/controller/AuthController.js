import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "JsonWebToken";

const categories = [
  {label:"Travel", icon: "user"},
  {label:"Shopping", icon: "user"},
  {label:"Investment", icon: "user"},
  {label:"bills", icon: "user"},
]


export const register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

     const userExists = User.findOne({ email });
  
    if (!userExists) {
      res.status(406).json({ massage: "User alredy exists" });
      return;
    }
  
    const saltRounds = 10;
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hashedPassword =  bcrypt.hashSync(password, salt);
  
    const user = await User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      categories,
    });
  
    await user.save();
    console.log(user , "authcontroller");
    res.status(201).json({ message: "user is created" });
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(406).json({ massage: "Email_id is not exists" });
      return;
    }
  
    const matched = await bcrypt.compare(password, user.password);
  
    if (!matched) {
      res.status(406).json({ massage: "Email_id is not exists" });
      return;
    }
    const payload = {
      username: email,
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ massage: "token created", token, user });

  }