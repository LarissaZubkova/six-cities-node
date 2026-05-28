import { CityName, Type } from '../../types/types';
import UserDto from '../user/user.dto';

export enum AmenityEnum {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export type Amenity =
  | AmenityEnum.Breakfast
  | AmenityEnum.AirConditioning
  | AmenityEnum.LaptopFriendlyWorkspace
  | AmenityEnum.BabySeat
  | AmenityEnum.Washer
  | AmenityEnum.Towels
  | AmenityEnum.Fridge;

export class CoordinatesDto {
  public latitude!: number;

  public longitude!: number;
}
export class OfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public postDate!: Date;

  public city!: CityName;

  public previewImage!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: Type;

  public rooms!: number;

  public guests!: number;

  public price!: number;

  public amenities!: Amenity[];

  public coordinates!: CoordinatesDto;

  public user!: UserDto;
}
