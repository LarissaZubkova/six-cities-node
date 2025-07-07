import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { CitiesType } from '../../types/cities-type.enum.js';
import { Amenity } from '../../types/amenity.type.js';
import { User } from '../../types/user.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
        private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
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
      rooms,
      price,
      amenities,
      email,
      avatarPath,
      name,
      userType,
      comments,
      coordinates,
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
      rooms: this.parseStringToNumber(rooms),
      price: this.parseStringToNumber(price),
      amenities: this.parseStringToArray(amenities) as Amenity[],
      user: this.parseUser(email, avatarPath, name, userType as 'simple' | 'pro'),
      comments: this.parseStringToNumber(comments),
      coordinates: {latitude: this.parseCoordinates(coordinates)[0], longitude:  this.parseCoordinates(coordinates)[1]}
    };
  }

  private parseCoordinates(coordinates: string): number[] {
    return coordinates.split(',').map((coordinate) => Number(coordinate));
  }

  private parseUser(email: string, avatarPath: string, name: string, userType: 'simple' | 'pro'): User {
    return {email, avatarPath, name, userType};
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
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
