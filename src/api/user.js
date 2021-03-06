import User from '../models/User';

export const getUsers = async (req, res) => {
  // get user list
  const users = await User.find();

  res.send(users);
};

export const getUser = async (req, res) => {
  const { userId } = req.params;

  // get user
  const thisUser = await User.findById(userId);
  if (!thisUser) {
    res.status(404).send();
    return;
  }

  res.send(thisUser);
};

export const postUser = async (req, res) => {
  const { username, password } = req.body;

  // get user
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).send({ error: 'user already exists' });
    return;
  }

  // create user
  const newUser = new User({
    username,
    password,
  });
  await newUser.save();

  res.send(newUser);
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  // delete user
  await User.deleteOne({ _id: userId });

  res.status(204).send();
};
