import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { getUsers, getUser, postUser, deleteUser } from './api/user.js';
import {
  getPlaylists,
  postPlaylist,
  generatePlaylist,
  readPlaylist,
} from './api/playlist';
import authMiddleware from './middlewares/authMiddleware';
import playlistMiddleware from './middlewares/playlistMiddleware';
import { getAlbums } from './api/album.js';
import { login } from './api/login.js';
import Container from './services/Container.js';
dotenv.config();

const PORT = 3000;

main().catch((err) => console.log('Fatal error :', err));

async function main() {
  // mongodb connection
  console.log('Starting mongodb ...');
  await mongoose.connect(process.env.DB_URL);

  // redis connection
  console.log('Starting service container ...');
  await Container.initServices();

  // start express
  const app = express();
  app.use(express.json());

  // TODO refacto with using express router
  app.get('/users', getUsers);
  app.get('/users/:userId', getUser);
  app.post('/users', postUser);
  app.delete('/users/:userId', deleteUser);
  app.get('/albums', getAlbums);

  app.use('/u/:userId', authMiddleware);
  app.get('/u/:userId/playlists', getPlaylists);
  app.post('/u/:userId/playlists', postPlaylist);

  app.use('/u/:userId/playlists/:playlistId', playlistMiddleware);
  app.post('/u/:userId/playlists/:playlistId/generate', generatePlaylist);
  app.get('/u/:userId/playlists/:playlistId/read', readPlaylist);

  app.post('/login', login);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}
