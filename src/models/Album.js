import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  type: String,
  name: String,
  tags: [String],
});

const albumSchema = new mongoose.Schema({
  name: String,
  artist: String,
  songs: [songSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Song = mongoose.model('Song', songSchema);
export const Album = mongoose.model('Album', albumSchema);
