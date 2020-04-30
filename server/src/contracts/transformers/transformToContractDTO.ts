import { IndividualContractDTO } from "../models/individualContract.dto";
import { Contract } from "../../database/entities/contract.entity";


export const transformToContractDTO = async (contract: Contract): Promise<IndividualContractDTO> => {
            const contractInfo = (({ 
                id,
                startDate,
                contractEndDate }): any => ({         
                id,
                startDate,
                contractEndDate }))(contract);
            const carInfo = (({ brand, model }): any => ({ brand, model }))(contract.car);
            const customerInfo = (({ firstName, lastName, birthdate}): any => ({ firstName, lastName, birthdate }))(contract.customer);
            const tempPrice = (contract.car).className
            const {price} = tempPrice

            const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo, ...customerInfo, price};

    return individualContractFormated
}