import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsUrl, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Amenity, AmenityEnum, CitiesType, TypesType } from '../../../types/index.js';
import { UpdateOfferValidationMessage } from './update-offer.messages.js';
import { Type } from 'class-transformer';

export class CoordinatesDto {
  @IsNumber({}, {message: UpdateOfferValidationMessage.latitude.invalidFormat})
  @Min(-90, {message: UpdateOfferValidationMessage.latitude.value})
  @Max(90, {message: UpdateOfferValidationMessage.latitude.value})
  public latitude: number;

  @IsNumber({}, {message: UpdateOfferValidationMessage.longitude.value})
  @Min(-180, {message: UpdateOfferValidationMessage.longitude.value})
  @Max(180, {message: UpdateOfferValidationMessage.longitude.value})
  public longitude: number;
}
export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: UpdateOfferValidationMessage.postDate.invalidFormat})
  public postDate?: Date;

  @IsOptional()
  @IsEnum(CitiesType, {message: UpdateOfferValidationMessage.city.invalid})
  public city?: CitiesType;

  @IsOptional()
  @IsUrl({}, {message: UpdateOfferValidationMessage.previewImage.invalidFormat})
  @MaxLength(256, {message: UpdateOfferValidationMessage.previewImage.maxLength})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.images.invalidFormat})
  @ArrayMaxSize(6, {message: UpdateOfferValidationMessage.images.maxSize})
  @IsUrl({}, {each: true, message: UpdateOfferValidationMessage.images.invalidFormat})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(TypesType, {message: UpdateOfferValidationMessage.type.invalid})
  public type?: TypesType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.rooms.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.rooms.maxValue})
  public rooms?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.guests.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.guests.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.guests.maxValue})
  public guests?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.price.invalidFormat})
  @Min(100, {message: UpdateOfferValidationMessage.price.minValue})
  @Max(100000, {message: UpdateOfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.amenities.invalidFormat})
  @ArrayMinSize(1, {message: UpdateOfferValidationMessage.amenities.minSize})
  @ArrayMaxSize(10, {message: UpdateOfferValidationMessage.amenities.maxSize})
  @IsEnum(AmenityEnum, {each: true, message: UpdateOfferValidationMessage.amenities.invalid})
  public amenities?: Amenity[];

  @IsOptional()
  @ValidateNested({message: UpdateOfferValidationMessage.coordinates.invalidFormat})
  @Type(() => CoordinatesDto)
  public coordinates?: CoordinatesDto;
}
