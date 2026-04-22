export enum UserType {
  Simple ='simple',
  Pro = 'pro'
}

export type User = {
    name: string;
    userType: UserType;
    email: string;
    avatarPath: string;
}
