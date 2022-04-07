import { Playlist } from '../models/Playlist';

const playlistMiddleware = async (req, res, next) => {
  const { userId, playlistId } = req.params;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    res.status(404).send({ error: 'playlist not found' });
    return;
  }

  if (playlist.userId.toString() !== userId) {
    res.status(403).send({ error: 'forbidden playlist' });
    return;
  }

  next();
};

export default playlistMiddleware;
