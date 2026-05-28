import { CityName, Type } from '../../types/types';

export class CoordinatesDto {
  public latitude?: number;

  public longitude?: number;
}
export class UpdateOfferDto {
  public title?: string;

  public description?: string;

  public postDate?: Date;

  public city?: CityName;

  public previewImage?: string;

  public images?: string[];

  public isPremium?: boolean;

  public isFavorite?: boolean;

  public type?: Type;

  public rooms?: number;

  public guests?: number;

  public price?: number;

  public amenities?: string[];

  public coordinates?: CoordinatesDto;
}
