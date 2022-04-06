const express = require('express');
const mongoose = require('mongoose');
const { login } = require('./api/login');
const { postPlaylist, getPlaylists } = require('./api/playlist');
const { postUser, getUsers, getUser, deleteUser } = require('./api/user');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();
const { initRedis } = require('./services/redis');

const PORT = 3000;

main().catch((err) => console.log('Fatal error :', err));

async function main() {
  // mongodb connection
  console.log("Starting mongodb ...");
  await mongoose.connect(process.env.DB_URL);

  // redis connection
  console.log("Starting redis ...");
  await initRedis();

  // start express
  const app = express();
  app.use(express.json());

  // TODO refacto with using express router
  app.get('/users', getUsers);
  app.get('/users/:userId', getUser);
  app.post('/users', postUser);
  app.delete('/users/:userId', deleteUser);

  app.use('/u/:userId', authMiddleware);
  app.get('/u/:userId/playlists', getPlaylists);
  app.post('/u/:userId/playlists', postPlaylist);

  app.post('/login', login);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
