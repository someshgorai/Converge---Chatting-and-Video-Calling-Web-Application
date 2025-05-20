import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are requried" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at aleast 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // To detect invalid characters in email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists, please use a different one." });
    }

    const index = Math.floor(Math.round() * 100) + 1; // generate a number between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    // TODO: CREATE THE USER IN STREAM AS WELL

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // Can't be accessed via JavaScript (prevents XSS)
      sameSite: "strict", // Only same-site requests allowed (prevents CSRF)
      secure: process.env.NODE_ENV === "production", // Sends cookie only over HTTPS in production
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  res.send("Login Route");
}

export function logout(req, res) {
  res.send("Logout Route");
}
