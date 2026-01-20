export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath: string;
  public userType: 'simple' | 'pro';
  public password: string;
}
