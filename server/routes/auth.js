const express = require("express");
const router = express.Router();
// Hash password bang thu vien argon2
const argon2 = require("argon2");
// Tao access token
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const verifyToken = require('../middleware/auth')

// @router Get api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) return res.status(400).json({success: false, message: 'User not found'})
    res.json({success: true, user})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})

// @route POST apo/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Simple validation
  if (!username && !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and password" });
  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "Missing username" });
  if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Missing password" });
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ success: false, message: "Confirm password incorrect" });
  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already existed!" });

    // Done
    const hashPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashPassword });
    await newUser.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      massage: "User create successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST apo/auth/login
// @desc Login user
// @access Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username && !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and password" });
  if (!username)
    return res
      .status(400)
      .json({ success: false, message: "Missing username" });
  if (!password)
    return res
      .status(400)
      .json({ success: false, message: "Missing password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password!" });

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      success: true,
      massage: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
