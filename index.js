const express = require("express");
const app = express();
require("dotenv").config();
require("./connection")();
const cors = require("cors");
const cookieparser = require("cookie-parser");
const cookieCheck = require("./middlewares/checkCookies");
const Blog = require("./models/blog");

// importing routes
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");

//setting up middlewares
app.use(cors({ origin: "*", methods: "GET,POST" }));
app.use(cookieparser());
app.use(express.static("public"));
app.use(express.urlencoded({ extened: true }));
app.use(express.json());
app.set("view engine", "ejs");

// checking for token in cookies
app.use(cookieCheck("token"));

// setting up urls
app.get("/", async (req, res) => {
  const allblogs = await Blog.find({}).populate("createdby");
  res.render("home", {
    allblogs: allblogs,
    user: req.user,
  });
});
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
