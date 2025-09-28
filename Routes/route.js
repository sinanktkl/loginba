


const express = require("express");
const { login, getUser } = require("../Controllers/AuthControllers");
const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.post("/login", login);
router.get("/me", authMiddleware, getUser);

module.exports = router;
