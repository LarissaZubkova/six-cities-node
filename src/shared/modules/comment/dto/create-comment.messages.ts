export const CreateCommentValidationMessage = {
  description: {
    minLength: 'Minimum title length must be 20',
    maxLength: 'Minimum title length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be valid ISO date',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  },
  userId: {
    invalidFormat: 'UserId must be a valid id',
  },
  offerId: {
    invalidFormat: 'OfferId must be a valid id',
  },

} as const;
