import { CarRentalSystemError } from '../exceptions/carRental-system.error';

export const isFound = (obj: any, message = 'Object is not defined'): void => {
  if (!obj) {
    throw new CarRentalSystemError(message, 404);
  }
};

export const should = (rule: boolean, message = 'Validation failed'): void => {
  if (!rule) {
    throw new CarRentalSystemError(message, 400);
  }
};
