import UserDto from '../user/user.dto';

export default class CommentDto {
  public id!: string;

  public description!: string;

  public user!: UserDto;

  public postDate!: string;

  public rating!: number;
}
