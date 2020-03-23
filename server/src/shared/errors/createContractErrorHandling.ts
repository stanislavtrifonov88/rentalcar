import { CarRentalSystemError } from "../exceptions/carRental-system.error";
import { NewContractDTO } from "../../contracts/models/newContract.dto";
import * as moment from 'moment';
import * as errorMessages from './error.messages'

export const createContractErrorHandling = (body: NewContractDTO) => {

    const now = (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-15, 'minutes')).format('YYYY-MM-DDTHH:mm');

    if (!moment(body.startDate).isValid()) {
        throw new CarRentalSystemError(errorMessages.validStartDate.msg, errorMessages.validStartDate.code);
    }

    if (!moment(body.contractEndDate).isValid()) {
        throw new CarRentalSystemError(errorMessages.validEndDate.msg, errorMessages.validEndDate.code);
    }

    if (now > body.startDate) {
        throw new CarRentalSystemError(errorMessages.startDateInThePast.msg, errorMessages.startDateInThePast.code);
    }

    if (body.startDate > body.contractEndDate) {
        throw new CarRentalSystemError(errorMessages.returnDateInThePast.msg, errorMessages.returnDateInThePast.code);
    }

    if (body.borrowerAge < 18) {
        throw new CarRentalSystemError(errorMessages.ageBelow18.msg, errorMessages.ageBelow18.code);
    }

    if (body.borrowerFirstName.length < 2) {
        throw new CarRentalSystemError(errorMessages.firstNameMinLength.msg, errorMessages.firstNameMinLength.code);
    }

    if (body.borrowerFirstName.length > 25) {
        throw new CarRentalSystemError(errorMessages.firstNamemaxLength.msg, errorMessages.firstNamemaxLength.code);
    }

    if (body.borrowerLastName.length < 2) {
        throw new CarRentalSystemError(errorMessages.lastNameMinLength.msg, errorMessages.lastNameMinLength.code);
    }

    if (body.borrowerLastName.length > 25) {
        throw new CarRentalSystemError(errorMessages.lastNamemaxLength.msg, errorMessages.lastNamemaxLength.code);
    }
}