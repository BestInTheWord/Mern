import { Router } from "express";
import bcrypt from "bcrypt";
import user from "../models/User.js";
import jwt from "JsonWebToken";

const router = new Router();

router.post("/register", async (req, res) => {

  const { firstName, lastName, email, password } = req.body;

  const userExists = await user.findOne({ email });

  if (!user) {
    res.status(406).json({ massage: "User alredy exists" });
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });

  await user.save();
  res.status(201).json({ message: "user is created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(406).json({ massage: "Email_id is not exists" });
    return;
  }

  const matched = await bcrypt.compare(password, userExists.password);

  if (!matched) {
    res.status(406).json({ massage: "Email_id is not exists" });
    return;
  }
  const payload = {
    username: email,
    _id: User._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ massage: "token created", token, user });
});

export default router;
