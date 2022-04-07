import jwt from 'jsonwebtoken';

export function generateAccessToken(user) {
  return jwt.sign(
    {
      user,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1800s' }
  );
}

export function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
