require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Model/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

async function insertUsers() {
  try {
    const adminPassword = await bcrypt.hash("admin123", 10);
    const userPassword = await bcrypt.hash("user123", 10);

    await User.deleteMany({}); // Clear old users (optional)

    await User.insertMany([
      { name: "Admin", email: "admin@example.com", password: adminPassword, role: "admin" },
      { name: "User", email: "user@example.com", password: userPassword, role: "user" },
    ]);

    console.log("✅ Users inserted");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

insertUsers();
