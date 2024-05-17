const express = require("express");
const path = require("path");

const app = express();

// serve static files
app.use("/", express.static(path.join(__dirname, "/static")));

// routes
app.use("/", require("./routes/root"));

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
