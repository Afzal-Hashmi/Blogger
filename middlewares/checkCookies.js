const { verifyToken } = require("./auth");

function verifyCookie(tokenName) {
  return (req, res, next) => {
    const token = req.cookies[tokenName];
    if (!token) return next();
    try {
      const payload = verifyToken(token);
      req.user = payload;
    } catch (error) {}

    return next();
  };
}

module.exports = verifyCookie;
