import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Album } from './models/Album';
import { Playlist } from './models/Playlist';
import User from './models/User';
dotenv.config();

main().catch((err) => console.log('Fatal error :', err));

async function main() {
  // mongodb connection
  console.log('Starting mongodb ...');
  await mongoose.connect(process.env.DB_URL);

  Album.collection.drop();
  User.collection.drop();
  Playlist.collection.drop();

  // generate albums
  for (let i = 0; i < 1000; i++) {
    let songs = [];
    for (let i = 0; i < 10; i++) {
      let tags = [];
      for (let i = 0; i < 4; i++) {
        tags.push(faker.random.word());
      }
      songs.push(
        new Song({
          type: faker.music.genre(),
          name: faker.name.jobTitle(),
          tags,
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
    let favoriteGenres = [];
    for (let i = 0; i < 3; i++) {
      favoriteGenres.push(faker.music.genre());
    }
    const newUser = new User({
      username: name,
      password: name + '1',
      favoriteGenres,
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
