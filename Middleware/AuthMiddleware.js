const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
