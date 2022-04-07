import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  userId: ObjectId,
  name: String,
  createdAt: { type: Date, default: Date.now },
});

export const Playlist = mongoose.model('Playlist', playlistSchema);
