export enum AmenityEnum {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}

export type Amenity =
  | AmenityEnum.Breakfast
  | AmenityEnum.AirConditioning
  | AmenityEnum.LaptopFriendlyWorkspace
  | AmenityEnum.BabySeat
  | AmenityEnum.Washer
  | AmenityEnum.Towels
  | AmenityEnum.Fridge;
