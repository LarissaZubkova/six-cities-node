import { defaultClasses, getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offers/index.js';
import { UserEntity } from '../users/index.js';

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, require: true})
  public description: string;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;

  @prop({required: true})
  public postDate: Date;

  @prop({required: true, min: 1, max: 5})
  public rating: number;
}

export const CommentModel = getModelForClass(CommentEntity);
