import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import subscribeRoute from "./api/subscribe.js";
import loginRoute from "./api/login.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Add root route
app.get("/", (req, res) => {
  res.send("🚀 Nvron Backend is Running");
});

app.use("/api/subscribe", subscribeRoute);

app.use("/api/login", loginRoute);


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
