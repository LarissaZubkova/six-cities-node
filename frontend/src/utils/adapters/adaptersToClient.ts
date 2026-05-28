import { CityLocation } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';
import { OfferDto } from '../../dto/offer/offer.dto';
import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import UserDto from '../../dto/user/user.dto';
import { Offer, User, Comment } from '../../types/types';

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.name,
    type: user.userType,
    email: user.email,
    avatarUrl: user.avatarPath,
  });

export const adaptUserToClient =
  (user: UserDto): User => ({
    name: user.name,
    type: user.userType,
    email: user.email,
    avatarUrl: user.avatarPath,
  });

export const adaptOffersToClient =
  (offers: OfferDto[]): Offer[] =>
    offers
      .filter((offer: OfferDto) =>
        offer.user !== null,
      )
      .map((offer: OfferDto) => ({
        id: offer.id,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        city: {name: offer.city, location: CityLocation[offer.city]},
        location: offer.coordinates,
        previewImage: offer.previewImage,
        type: offer.type,
        bedrooms: offer.rooms,
        description: offer.description,
        goods: offer.amenities,
        host: adaptUserToClient(offer.user),
        images: offer.images,
        maxAdults: offer.guests,
      }));

export const adaptCommentsToClient =
  (comments: CommentDto[]): Comment[] =>
    comments
      .filter((comment: CommentDto) =>
        comment.user !== null,
      )
      .map((comment: CommentDto) => ({
        id: comment.id,
        comment: comment.description,
        date: comment.postDate,
        user: adaptUserToClient(comment.user),
        rating: comment.rating,
      }));
