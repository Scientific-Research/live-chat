import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";

import databaseConnect from "./config/database.js";
import authRouter from "./routes/authRoute.js";
// import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
// const messengerRoute = require("./routes/messengerRoute");

dotenv.config({
  path: "backend/config/config.env",
});

app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());
app.use("/api/messenger", authRouter);
// app.use("/api/messenger", messengerRoute);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("This is from backend Sever");
});

databaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
