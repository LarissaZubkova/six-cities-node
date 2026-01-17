import { Document, model, Schema } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Min length for name is 15'],
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  userType: String,
  avatarPath: String,
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
