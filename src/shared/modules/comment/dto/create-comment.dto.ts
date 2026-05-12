import { IsDateString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  @MinLength(20, {message: CreateCommentValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateCommentValidationMessage.description.maxLength})
  public description: string;

  @IsMongoId({message: CreateCommentValidationMessage.offerId.invalidFormat})
  public offerId: string;

  public userId: string;

  @IsDateString({}, {message: CreateCommentValidationMessage.postDate.invalidFormat})
  public postDate: Date;

  @IsInt({message: CreateCommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateCommentValidationMessage.rating.minValue})
  @Max(5, {message: CreateCommentValidationMessage.rating.maxValue})
  public rating: number;
}
