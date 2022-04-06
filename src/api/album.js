const { Album } = require('../models/Album');

const getAlbums = async (req, res) => {
  // get user list
  const albums = await Album.find();

  res.send(albums);
};

module.exports = getAlbums;
