import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod, PrivateRouteMiddleware, UploadFileMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Response, Request } from 'express';
import { CreateUserDto, CreateUserRequest, LoggedUserRdo, LoginUserDto, LoginUserRequest, UploadUserAvatarRdo, UserRdo, UserService } from './index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { AuthService } from '../auth/index.js';

injectable();
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController ...');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create, middlewares: [new ValidateDtoMiddleware(CreateUserDto)]});
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login, middlewares: [new ValidateDtoMiddleware(LoginUserDto)]});
    this.addRoute({ path: '/:userId/avatar', method: HttpMethod.Post, handler: this.uploadAvatar, middlewares: [new ValidateObjectIdMiddleware('userId'), new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')]});
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.checkAuthenticate});
    this.addRoute({ path: '/logout', method: HttpMethod.Delete, handler: this.logout, middlewares: [new PrivateRouteMiddleware()]});
  }

  public async create (
    { body }: CreateUserRequest,
    res : Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} exists`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }: LoginUserRequest,
    res : Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);

    this.ok(res, Object.assign(responseData, {token}));
  }

  public async uploadAvatar({params, file}: Request, res: Response) {
    const {userId} = params;
    const uploadFile = {avatarPath: file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, {filepath: uploadFile.avatarPath}));
  }

  public async checkAuthenticate({tokenPayload: {email}}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async logout(req: Request, res: Response): Promise<void> {
    this.logger.info(`User logged out: ${req.tokenPayload?.email || 'unknown'}`);

    this.ok(res, {
      message: 'Logged out successfully'
    });
  }
}
