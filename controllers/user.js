const User = require("../models/userModel");

async function handleSignup(req, res) {
  const { fullName, Email, Password } = req.body;
  try {
    const user = await User.create({
      name: fullName,
      email: Email,
      password: Password,
    });
    return res.status(200).redirect("/user/login");
  } catch (error) {
    return res.status(400).redirect("/user/signup");
  }
}
async function handleLogin(req, res) {
  const { Email, Password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(Email, Password);
    return res.status(200).cookie("token", token).redirect("/");
  } catch (error) {
    return res.status(400).render("login", {
      error: "Invalid credentials Please Try Again",
    });
  }
}
function handleLogout(req, res) {
  res.clearCookie("token").redirect("/");
}

module.exports = { handleSignup, handleLogin, handleLogout };
