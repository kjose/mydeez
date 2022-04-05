const Playlist = require('../models/Playlist');

const postPlaylist = async (req, res) => {
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

const getPlaylists = async (req, res) => {
  const { userId } = req.params;

  // get user list
  const playlists = await Playlist.find({ userId });

  res.send(playlists);
};

module.exports = {
  getPlaylists,
  postPlaylist,
};
