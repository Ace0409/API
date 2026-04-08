const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// DB connection
mongoose.connect("mongodb://127.0.0.1:27017/employees")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const routes = require("./routes");
app.use("/", routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
