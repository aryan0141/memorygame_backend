require("dotenv").config();
const express = require("express");
const app = express();
const ConnectDB = require("./config/connect");
const path = require("path");
const bodyParser = require("body-parser");
const cors=require("cors")

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cookies
const cookieparser = require("cookie-parser");
app.use(cookieparser());

//Connect Database
ConnectDB();

app.use(cors())

// app.get("*", (req, res) => {
//   return res.redirect("/dashboard");
// });

app.get("/", (req, res) => res.send("App is running! (Index Page)"));

// API Routes
app.use("/auth", require("./routes/auth"));
app.use("/leaderboard", require("./routes/Leaderboard"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
