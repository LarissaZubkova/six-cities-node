import { Amenity } from './amenity.type.js';
import { CitiesType } from './cities-type.enum.js';
import { User } from './user.type.js';

export type OfferType = {
    title: string;
    description: string;
    postDate: Date;
    city: CitiesType;
    previewImage: string;
    images: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    rooms: number;
    price: number;
    amenities: Amenity[];
    user: User;
    comments: number;
    coordinates: {latitude: number, longitude: number}
}
