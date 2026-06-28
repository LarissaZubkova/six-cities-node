export class CreateUserDto {
  public name!: string;

  public email!: string;

  public userType!: 'simple' | 'pro';

  public password!: string;

  public avatarPath!: string;
}
