import { UserType } from '../../const';

export default class UserDto {
  public email!: string ;

  public avatarPath!: string;

  public name!: string;

  public userType!: UserType;
}
