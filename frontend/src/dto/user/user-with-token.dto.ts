import { UserType } from '../../const';

export default class UserWithTokenDto {
  public email!: string ;

  public avatarPath!: string;

  public name!: string;

  public userType!: UserType;

  public token!: string;
}
