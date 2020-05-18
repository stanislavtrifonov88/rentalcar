import { IndividualContractDTO } from "../models/individualContract.dto";
import { Contract } from "../../database/entities/contract.entity";
import { differenceInYears } from "../../shared/constants/dateModifiers";


export const transformToContractDTO = async (contract: Contract): Promise<IndividualContractDTO> => {
            const contractInfo = (({ 
                id,
                startDate,
                contractEndDate }): any => ({         
                id,
                startDate,
                contractEndDate }))(contract);
            const carInfo = (({ brand, model }): any => ({ brand, model }))(contract.car);
            const customerInfo = (({ phone, firstName, lastName, birthdate}): any => ({ phone, firstName, lastName, birthdate }))(contract.customer);
            const tempPrice = (contract.car).className;
            const {price} = tempPrice;
            const age = differenceInYears(customerInfo.birthdate)

            const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo, ...customerInfo, age, price};

    return individualContractFormated
}