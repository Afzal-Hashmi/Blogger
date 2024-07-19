const router = require("express").Router();
const {
  handleSignup,
  handleLogin,
  handleLogout,
} = require("../controllers/user");

router.get("/signup", function (req, res) {
  return res.render("signup");
});

router.get("/login", function (req, res) {
  return res.render("login");
});

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;
