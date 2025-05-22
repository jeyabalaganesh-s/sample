import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Dummy user for demo (replace with real DB check)
const dummyUser = {
  id: "123",
  username: "testuser",
  password: "password123",
};

router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Get client IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  // Simple auth check (replace with DB)
  if (username === dummyUser.username && password === dummyUser.password) {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";

    const token = jwt.sign(
      {
        userId: dummyUser.id,
        username,
        ip,
      },
      secret,
      { expiresIn: "1h" }
    );

    return res.json({ token, message: "Login successful." });
    
  } else {
    return res.status(401).json({ message: "Invalid credentials." });
  }
});

export default router;
