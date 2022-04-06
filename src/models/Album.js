const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  type: String,
  name: String,
});

const albumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  songs: [songSchema],
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model('Song', songSchema);
const Album = mongoose.model('Album', albumSchema);

module.exports = {
  Song,
  Album,
};
