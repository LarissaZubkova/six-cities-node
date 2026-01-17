import { Document, model, Schema } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  userType: String,
  avatarPath: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
