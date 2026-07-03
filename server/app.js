const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")
const testRoutes = require("./routes/testRoute")


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/test",testRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;