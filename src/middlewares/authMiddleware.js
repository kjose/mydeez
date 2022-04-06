const { decodeToken } = require('../helpers/jwt');

const authMiddleware = (req, res, next) => {
  const { userId } = req.params;
  const { authorization } = req.headers;
  const bearer = authorization ? authorization.split('Bearer ') : null;

  if (!bearer || bearer.length != 2) {
    res.status(401).send({ error: 'missing authorization header' });
    return;
  }

  const token = decodeToken(bearer[1]);
  if (!token) {
    res.status(401).send({ error: 'invalid token' });
    return;
  }

  if (token.user._id != userId) {
    res.status(401).send({ error: 'user not granted' });
    return;
  }

  next();
};

module.exports = authMiddleware;
