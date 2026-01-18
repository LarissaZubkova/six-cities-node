import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { CreateUserDto, UserService } from './index.js';

export class DefaultUserService implements UserService {
  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }
}
