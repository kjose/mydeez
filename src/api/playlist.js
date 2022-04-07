import { Playlist } from '../models/Playlist';
import Container from '../services/Container';

export const postPlaylist = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  // create user
  const newPlaylist = new Playlist({
    userId,
    name,
  });
  await newPlaylist.save();

  res.send(newPlaylist);
};

export const getPlaylists = async (req, res) => {
  const { userId } = req.params;

  // get user list
  const playlists = await Playlist.find({ userId });

  res.send(playlists);
};

export const generatePlaylist = async (req, res) => {
  const { userId, playlistId } = req.params;

  Container.get('playlistGenerator').generatePlaylist(userId, playlistId);

  res.status(200).send();
};

export const readPlaylist = async (req, res) => {
  const { playlistId } = req.params;

  const playlist = await Container.get('playlistGenerator').readPlaylist(
    playlistId
  );

  res.send(playlist);
};
