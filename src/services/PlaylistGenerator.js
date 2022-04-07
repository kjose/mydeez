import { Album } from '../models/Album';
import User from '../models/User';
import Container from './Container';

class PlaylistGenerator {
  constructor() {
    console.log('Starting playlistGenerator ...');
  }

  async generatePlaylist(userId, playlistId) {
    const user = await User.findById(userId);
    if (!user) {
      throw 'user not found';
    }

    const songs = await Album.find(
      { 'songs.type': user.favoriteGenres },
      { songs: { $elemMatch: { type: user.favoriteGenres } }, _id: 1 }
    ).limit(10);

    const songsPlaylist = songs
      .reduce((prev, curr) => [...curr.songs, ...prev], [])
      .sort(() => Math.random() - 0.5);

    Container.get('redis').set(
      `pl_${playlistId}`,
      JSON.stringify(songsPlaylist)
    );
  }

  async readPlaylist(playlistId) {
    return JSON.parse(await Container.get('redis').get(`pl_${playlistId}`));
  }
}

export default PlaylistGenerator;
