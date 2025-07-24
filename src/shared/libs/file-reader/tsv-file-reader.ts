import { FileReader } from './file-reader.interface.js';
import { OfferType } from '../../types/offer.type.js';
import { CitiesType } from '../../types/cities-type.enum.js';
import { Amenity } from '../../types/amenity.type.js';
import { User } from '../../types/user.type.js';
import { TypesType } from '../../types/types-type.enum.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
        private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
