import { defaultClasses, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Amenity, CitiesType, TypesType, AmenityEnum } from '../../types/index.js';
import { UserEntity } from '../users/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: 10, maxlength: 100})
  public title: string;

  @prop({trim: true, required: true, minlength: 20, maxlength: 1024})
  public description: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: CitiesType,
    required: true
  })
  public city: CitiesType;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({
    type: () => String,
    enum: TypesType,
    required: true
  })
  public type: TypesType;

  @prop({required: true, min: 1, max: 8})
  public rooms: number;

  @prop({required: true, min: 1, max: 10})
  public guests: number;

  @prop({required: true, min: 100, max: 100000})
  public price: number;

  @prop({
    type: () => String,
    enum: AmenityEnum,
    required: true
  })
  public amenities: Amenity[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public comments: number;

  @prop({required: true})
  public coordinates: {latitude: number, longitude: number};
}
