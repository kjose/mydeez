require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = require('./models/User');
const Playlist = require('./models/Playlist');
const { Album, Song } = require('./models/Album');

main().catch((err) => console.log('Fatal error :', err));

async function main() {
  // mongodb connection
  console.log('Starting mongodb ...');
  await mongoose.connect(process.env.DB_URL);

  Album.collection.drop();
  User.collection.drop();
  Playlist.collection.drop();

  // generate albums
  for (let i = 0; i < 10000; i++) {
    let songs = [];
    for (let i = 0; i < 10; i++) {
      songs.push(
        new Song({
          type: faker.music.genre(),
          name: faker.name.jobTitle(),
        })
      );
    }

    const newAlbum = new Album({
      name: faker.name.jobTitle(),
      artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
      songs,
    });
    newAlbum.save();
  }

  // generate users
  for (let i = 0; i < 4; i++) {
    const name = faker.name.firstName();
    const newUser = new User({
      username: name,
      password: name + '1',
    });
    await newUser.save();

    // generate playlists
    for (let i = 0; i < 10; i++) {
      const newPlaylist = new Playlist({
        userId: newUser._id,
        name: faker.name.jobTitle(),
      });
      await newPlaylist.save();
    }
  }

  console.log('Finished ...');
  process.exit(0);
}
