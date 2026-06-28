import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { CreateUserValidationMessage } from '../index.js';
import { UserType } from '../../../types/user.type.js';

export class CreateUserDto {
  @IsString({message: CreateUserValidationMessage.name.invalidFormat})
  @Length(1, 15, {message: CreateUserValidationMessage.name.invalidFormat})
  public name: string;

  @IsEmail({}, {message: CreateUserValidationMessage.email.invalidFormat})
  public email: string;

  @IsEnum(UserType, {message: CreateUserValidationMessage.userType.invalidFormat})
  public userType: UserType;

  @IsString({message: CreateUserValidationMessage.password.invalidFormat})
  @Length(6, 12, {message: CreateUserValidationMessage.password.invalidFormat})
  public password: string;
}
