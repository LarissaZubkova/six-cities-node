import { CityName, Type } from '../../types/types';

export class CoordinatesDto {
  public latitude!: number;

  public longitude!: number;
}
export class CreateOfferDto {
  public title!: string;

  public description!: string;

  public postDate!: string;

  public previewImage!: string;

  public city!: CityName;

  public images!: string[];

  public isPremium!: boolean;

  public type!: Type;

  public rooms!: number;

  public guests!: number;

  public price!: number;

  public amenities!: string[];

  public coordinates!: CoordinatesDto;
}
