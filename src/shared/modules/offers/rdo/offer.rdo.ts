import { Expose, Type } from 'class-transformer';
import { Amenity, CitiesType, TypesType } from '../../../types/index.js';
import { UserRdo } from '../../users/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: CitiesType;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: TypesType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: Amenity[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  public comments: number;

  @Expose()
  public coordinates: {latitude: number, longitude: number};
}
