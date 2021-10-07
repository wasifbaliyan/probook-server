const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const posts = require("./routes/posts.routes");
const comments = require("./routes/comments.routes");
const followings = require("./routes/followings.routes");
const followers = require("./routes/followers.routes");
const profiles = require("./routes/profiles.routes");

const verifyAuthentication = require("./middlewares/auth.middleware");

const app = express();
const connectToDB = require("./db/db");

connectToDB(process.env.DB_URL);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the Probook API!",
  });
});

app.use("/auth", auth);
app.use(verifyAuthentication);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/comments", comments);
app.use("/api/followers", followers);
app.use("/api/followings", followings);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
