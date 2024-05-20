require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3000;

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");

const app = express();

// Connect to MongoDB
connectDB();

// serve static files
app.use("/", express.static(path.join(__dirname, "/static")));

// to handle content-type: application/json requests
app.use(express.json());

// to handle content-type: application/x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", require("./routes/root"));
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/user", userRoute);

app.use(cors); // we can configure it later

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
