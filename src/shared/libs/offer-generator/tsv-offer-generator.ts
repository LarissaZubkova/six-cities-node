import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const INTEGER = 1;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = getRandomItem<string>(this.mockData.postDates);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = this.mockData.images;
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const randomRating = generateRandomValue(MIN_RATING,MAX_RATING, INTEGER);
    const rating = randomRating > MAX_RATING ? MAX_RATING : randomRating;
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS,MAX_ROOMS);
    const guests = generateRandomValue(MIN_GUESTS,MAX_GUESTS);
    const coast = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems(this.mockData.goods);
    const user = getRandomItem<string>(this.mockData.users);
    const isPro = getRandomItem<boolean>(this.mockData.isPro);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const locations = getRandomItem(this.mockData.locations);

    const {latitude, longitude} = locations;

    return [
      title, description, postDate, city, previewImage, images,
      isPremium, isFavorite, rating, type, rooms, guests,
      coast, goods, user, isPro, email, avatar, latitude, longitude
    ].join('\t');
  }
}
