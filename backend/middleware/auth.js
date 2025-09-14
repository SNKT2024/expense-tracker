const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(404).json({ error: "Invalid Token" });
  }
};

module.exports = { verifyToken };
