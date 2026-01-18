import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto, UserService } from './index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { UserEntity, UserModel } from './user.entity.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ){}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = UserModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }
}
