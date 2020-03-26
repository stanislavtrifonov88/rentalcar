import { createContractErrorHandling } from "./createContractErrorHandling";
import { NewContractDTO } from "../../contracts/models/newContract.dto";
import * as moment from 'moment';
import * as errorMessages from './error.messages';

describe('createContractErrorHandling', () => { 
    it('should get throw an error with the correct message when first name length is below minumum', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 't',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),   
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act && Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.firstNameMinLength.msg)
    
      });

      it('should get throw an error with the correct message when first name length is above maximum', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'tttttttttttttttttttttttttttttttttttttttttttttttt',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),   
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.firstNamemaxLength.msg)
    
      });

      it('should get throw an error with the correct message when last name length is below minumum', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'ttt',
            borrowerLastName: 't',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),   
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act && Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.lastNameMinLength.msg)
    
      });

      it('should get throw an error with the correct message when last name length is above maximum', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'testtttttttttttttttttttttttttttt',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),   
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.lastNamemaxLength.msg)
    
      });

      it('should get throw an error with the correct message when start date is not valid', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: 'test',   
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.validStartDate.msg)
    
      });


      it('should get throw an error with the correct message when start date is not valid', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
            contractEndDate: 'test',
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.validEndDate.msg)
    
      });

      it('should get throw an error with the correct message when start date is in the past', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-48, 'hours')).format('YYYY-MM-DDTHH:mm'),
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.startDateInThePast.msg)
    
      });

      it('should get throw an error with the correct message when return date is in the past', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'test',
            borrowerAge: 18,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
            contractEndDate: (moment(new Date(), 'YYYY-MM-DDTHH:mm').add(-48, 'hours')).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.returnDateInThePast.msg)
    
      });

      it('should get throw an error with the correct message when return date is in the past', async () => {

        // Arrange
        const mockInput: NewContractDTO = {
            borrowerFirstName: 'test',
            borrowerLastName: 'test',
            borrowerAge: 17,
            startDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
            contractEndDate: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
        }
    
        // Act & Assert
    
        expect(() => createContractErrorHandling(mockInput)).toThrowError(errorMessages.ageBelow18.msg)
    
      });
});