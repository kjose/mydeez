import { generateAccessToken } from '../helpers/jwt';
import User from '../models/User';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).send();
  }

  if (user.password != password) {
    res.status(403).send();
  }

  res.send({
    access_token: generateAccessToken(user),
  });
};
