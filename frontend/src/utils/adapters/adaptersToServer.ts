import CreateCommentDto from '../../dto/comment/create-comment.dto';
import { CreateOfferDto } from '../../dto/offer/create-offer.dto';
import { UpdateOfferDto } from '../../dto/offer/update-offer.dto';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { NewOffer, Offer, UserRegister, Comment } from '../../types/types';
import { getTime } from '../utils';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    avatarPath: ' ',
    password: user.password,
    userType:  user.type === 'regular' ? 'simple' : user.type,
  });

export const adaptEditTicketToServer =
  (offer: Offer): UpdateOfferDto => ({
    title: offer.title,
    description: offer.description,
    postDate: new Date(),
    price: offer.price,
    previewImage: offer.previewImage,
    images: offer.images,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    rooms: offer.bedrooms,
    guests: offer.maxAdults,
    city: offer.city.name,
    type: offer.type,
    amenities: offer.goods,
    coordinates: offer.location,
  });

export const adaptCreateTicketToServer =
  (offer: NewOffer): CreateOfferDto => ({
    title: offer.title,
    description: offer.description,
    postDate: getTime(),
    price: offer.price,
    previewImage: offer.previewImage,
    images: offer.images,
    isPremium: offer.isPremium,
    rooms: offer.bedrooms,
    guests: offer.maxAdults,
    city: offer.city.name,
    type: offer.type,
    amenities: offer.goods,
    coordinates: offer.location,
  });

export const adaptCreateCommentToServer =
  (comment: Comment): CreateCommentDto => ({
    description: comment.comment,
    offerId: comment.id,
    rating: comment.rating,
  });

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };

export const adaptImageToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('image', file);

    return formData;
  };
