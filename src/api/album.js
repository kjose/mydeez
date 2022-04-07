import { Album } from '../models/Album';

export const getAlbums = async (req, res) => {
  // get user list
  const albums = await Album.find();

  res.send(albums);
};
