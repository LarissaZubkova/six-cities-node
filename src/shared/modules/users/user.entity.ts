import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: 1, maxlength: 15})
  public name: string;

  @prop({required: true, unique: true})
  public email: string;

  public userType: 'simple' | 'pro';

  @prop({required: false, default: ''})
  public avatarPath: string;
}

export const UserModel = getModelForClass(UserEntity);
