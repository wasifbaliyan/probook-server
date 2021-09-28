const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const posts = require("./routes/posts.routes");

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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));
