
const User = require("../Model/userController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Login User/Admin
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid Email/Password" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email/Password" });
    }

    // 3. Sign JWT
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get current user
exports.getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
