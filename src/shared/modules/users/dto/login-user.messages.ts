export const LoginUserValidationMessage = {
  email: {
    invalidFormat: 'Email must be a valid address',
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: 'Min length is 6 max is 12',
  },
} as const;
