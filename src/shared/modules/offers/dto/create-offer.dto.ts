import { Amenity, CitiesType, TypesType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: CitiesType;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: TypesType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: Amenity[];
  public userId: string;
  public comments: number;
  public coordinates: {latitude: number, longitude: number};
}
