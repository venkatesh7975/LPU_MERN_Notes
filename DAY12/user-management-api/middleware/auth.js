require("dotenv").config();

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (token === `Bearer ${process.env.API_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authMiddleware;
