const jwt = require("jsonwebtoken");

function createTokenforUser(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profileImage: user.profileImageUrl,
  };

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    return false;
  }
}
function verifyToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return false;
  }
}

module.exports = { createTokenforUser, verifyToken };
