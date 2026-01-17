import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: 1, maxlength: 15})
  public name: string;

  @prop({required: true, unique: true})
  public email: string;

  public userType: 'simple' | 'pro';

  @prop({required: false, default: ''})
  public avatarPath: string;

  @prop({ required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.avatarPath = userData.avatarPath;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
