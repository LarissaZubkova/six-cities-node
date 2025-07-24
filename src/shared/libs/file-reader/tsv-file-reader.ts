import { FileReader } from './file-reader.interface.js';
import { OfferType } from '../../types/offer.type.js';
import { CitiesType } from '../../types/cities-type.enum.js';
import { Amenity } from '../../types/amenity.type.js';
import { User } from '../../types/user.type.js';
import { TypesType } from '../../types/types-type.enum.js';
import EventEmitter from 'node:events';

export class TSVFileReader extends EventEmitter implements FileReader {
  private rawData = '';

  constructor(
        private readonly filename: string
  ) {
    super();
  }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): OfferType[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): OfferType {
    const [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      amenities,
      name,
      userType,
      email,
      avatarPath,
      comments,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: CitiesType[city as'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam'| 'Hamburg'| 'Dusseldorf'],
      previewImage,
      images: this.parseStringToArray(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseStringToNumber(rating),
      type: TypesType[type as 'Paris', 'Apartment', 'House','Room', 'Hotel'],
      rooms: this.parseStringToNumber(rooms),
      guests: this.parseStringToNumber(guests),
      price: this.parseStringToNumber(price),
      amenities: this.parseStringToArray(amenities) as Amenity[],
      user: this.parseUser(name, userType as 'simple' | 'pro', email, avatarPath),
      comments: this.parseStringToNumber(comments),
      coordinates: {latitude: this.parseStringToNumber(latitude), longitude:  this.parseStringToNumber(longitude)}
    };
  }

  private parseUser(name: string, userType: 'simple' | 'pro', email: string, avatarPath: string,): User {
    return {name, userType, email, avatarPath};
  }

  private parseStringToNumber(value: string): number {
    return Number.parseInt(value, 10);
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseStringToArray(value: string): string[] {
    return value.split(';');
  }

  public read(): void {

  }

  public toArray(): OfferType[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
