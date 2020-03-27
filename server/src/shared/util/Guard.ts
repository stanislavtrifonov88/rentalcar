import { CarRentalSystemError } from "../exceptions/carRental-system.error"

const isFound = (obj: any, message = "Object is not defined") => {
  if (!obj) {
    throw new CarRentalSystemError(message, 404);
  }
}


const should = (rule: boolean, message = "Validation failed") => {
  if (!rule) {
    throw new CarRentalSystemError(message, 400);
  }
}

export default {
  isFound,
  should,
}