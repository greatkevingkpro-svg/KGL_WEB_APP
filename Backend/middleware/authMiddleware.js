const jwt = require("jsonwebtoken");

// middleware that checks JWT
const authMiddleware = (req, res, next) => {
  const token = req.query.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authMiddleware }