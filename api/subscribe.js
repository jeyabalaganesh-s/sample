import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";

    const decoded = jwt.verify(token, secret);

    if (decoded.ip !== ip) {
      return res.status(403).json({ message: "IP mismatch" });
    }

    // Proceed with subscription logic
    return res.json({ message: `Subscribed successfully for ${req.body.plan}` });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
