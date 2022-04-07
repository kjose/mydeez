import mongoose from 'mongoose';

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favoriteGenres: [String],
  role: { type: String, default: ROLE_USER },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

export default User;
