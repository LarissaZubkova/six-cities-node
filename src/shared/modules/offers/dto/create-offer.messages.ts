export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Minimum title length must be 100',
  },
  description: {
    minLength: 'Minimum title length must be 20',
    maxLength: 'Minimum title length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be valid ISO date',
  },
  city: {
    invalid: 'City must be Paris or Cologne or Brussels or Amsterdam or Hamburg or Dusseldorf',
  },
  previewImage: {
    invalidFormat: 'previewImage must be a valid URL',
    maxLength: 'To short for field "previewImage"',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  type: {
    invalid: 'City must be apartment or house or room or hotel',
  },
  rooms: {
    invalidFormat: 'Rooms must be an integer',
    minValue: 'Minimum rooms is 1',
    maxValue: 'Maximum rooms is 8',
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: 'Minimum guests is 1',
    maxValue: 'Maximum guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  images: {
    invalidFormat: 'Each image must be a valid URL',
    maxSize: 'You must provide exactly 6 images',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  isFavorite: {
    invalidFormat: 'isFavorite must be a boolean',
  },
  amenities: {
    invalidFormat: 'Amenities must be an array',
    invalid: 'Each amenity must be a valid amenity type',
    minSize: 'Minimum 1 amenity required',
    maxSize: 'Maximum 10 amenities allowed',
  },
  comments: {
    invalidFormat: 'Comments must be an integer',
    minValue: 'Comments cannot be negative',
  },
  userId: {
    invalidFormat: 'UserId must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Coordinates must be a valid object with latitude and longitude',
  },
  latitude: {
    invalidFormat: 'Latitude must be an integer',
    value: 'Latitude must be between -90 and 90',
  },
  longitude: {
    invalidFormat: 'Longitude must be an integer',
    value: 'Longitude must be between -90 and 90',
  }
};
