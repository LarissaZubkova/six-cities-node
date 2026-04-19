import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../users/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public rating: number;

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
