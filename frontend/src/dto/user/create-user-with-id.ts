import { UserType } from '../../const';

export default class CreateUserWithIdDto {
  public id!: string;

  public email!: string;

  public avatarPath!: string;

  public name!: string;

  public userType!: UserType;

  public password!: string;
}
