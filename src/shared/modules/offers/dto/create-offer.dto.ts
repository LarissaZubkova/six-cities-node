import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, IsNumber, IsUrl, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Amenity, AmenityEnum, CitiesType, TypesType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from '../index.js';
import { Type } from 'class-transformer';

export class CoordinatesDto {
  @IsNumber({}, {message: CreateOfferValidationMessage.latitude.invalidFormat})
  @Min(-90, {message: CreateOfferValidationMessage.latitude.value})
  @Max(90, {message: CreateOfferValidationMessage.latitude.value})
  public latitude: number;

  @IsNumber({}, {message: CreateOfferValidationMessage.longitude.value})
  @Min(-180, {message: CreateOfferValidationMessage.longitude.value})
  @Max(180, {message: CreateOfferValidationMessage.longitude.value})
  public longitude: number;
}
export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.postDate.invalidFormat})
  public postDate: Date;

  @IsEnum(CitiesType, {message: CreateOfferValidationMessage.city.invalid})
  public city: CitiesType;

  @IsUrl({}, {message: CreateOfferValidationMessage.previewImage.invalidFormat})
  @MaxLength(256, {message: CreateOfferValidationMessage.previewImage.maxLength})
  public previewImage: string;

  @IsArray({message: CreateOfferValidationMessage.images.invalidFormat})
  @ArrayMaxSize(6, {message: CreateOfferValidationMessage.images.maxSize})
  @IsUrl({}, {each: true, message: CreateOfferValidationMessage.images.invalidFormat})
  public images: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsInt({message: CreateOfferValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsEnum(TypesType, {message: CreateOfferValidationMessage.type.invalid})
  public type: TypesType;

  @IsInt({message: CreateOfferValidationMessage.rooms.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.rooms.maxValue})
  public rooms: number;

  @IsInt({message: CreateOfferValidationMessage.guests.invalidFormat})
  @Min(1, {message: CreateOfferValidationMessage.guests.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guests.maxValue})
  public guests: number;

  @IsInt({message: CreateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(100000, {message: CreateOfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.amenities.invalidFormat})
  @ArrayMinSize(1, {message: CreateOfferValidationMessage.amenities.minSize})
  @ArrayMaxSize(10, {message: CreateOfferValidationMessage.amenities.maxSize})
  @IsEnum(AmenityEnum, {each: true, message: CreateOfferValidationMessage.amenities.invalid})
  public amenities: Amenity[];

  public userId: string;

  @IsInt({message: CreateOfferValidationMessage.comments.invalidFormat})
  @Min(0, {message: CreateOfferValidationMessage.comments.minValue})
  public comments: number;

  @ValidateNested({message: CreateOfferValidationMessage.coordinates.invalidFormat})
  @Type(() => CoordinatesDto)
  public coordinates: CoordinatesDto;
}
