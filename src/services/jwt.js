const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(
    {
      user,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
  );
}

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateAccessToken,
  decodeToken,
};
