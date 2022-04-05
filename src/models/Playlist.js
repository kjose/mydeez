const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  userId: ObjectId,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
