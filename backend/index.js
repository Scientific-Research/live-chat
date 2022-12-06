import express from "express";
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("This is from backend SERVER!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
