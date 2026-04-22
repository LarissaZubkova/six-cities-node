export const CreateUserValidationMessage = {
  email: {
    invalidFormat: 'Email must be a valid address',
  },
  avatarPath: {
    invalidFormat: 'AvatarPath is required',
  },
  name: {
    invalidFormat: 'Name is required',
    lengthField: 'Min length is 1 max is 15'
  },
  password: {
    invalidFormat: 'Name is required',
    lengthField: 'Min length is 6 max is 12',
  },
  userType: {
    invalidFormat: 'UserType must be simple or pro',
  },
};
