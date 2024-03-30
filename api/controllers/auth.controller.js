import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utiles/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const Hasedpassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: Hasedpassword });

  try {
    await newUser.save();
    res.status(201).json({ message: "SAved data suceefull" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, validUser.password);
    if (!isPasswordValid) return next(errorHandler(401, "Invalid credentials"));

    // If password is valid, generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // Omit password field from response
    const { password: hashedPassword, ...rest } = validUser._doc;

    // Set token as cookie and send user data
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;

      // Set token as cookie and send user data
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const Hasedpassword = bcrypt.hashSync(generatePassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: Hasedpassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      // Omit password field from response
      const { password: hashedPassword, ...rest } = validUser._doc;

      // Set token as cookie and send user data
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
