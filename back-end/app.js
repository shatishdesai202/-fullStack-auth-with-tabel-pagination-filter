const express = require("express");
var cors = require("cors");

const app = express();
app.options("*", cors());
app.use(cors());

const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true }, () =>
  console.log("Database connected!")
);

// Middleware
app.use(express.json());

app.use("/api", authRoute);
app.listen(8080, () => console.log("server running at 8080"));
