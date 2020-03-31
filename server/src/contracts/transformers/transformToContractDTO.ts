import { IndividualContractDTO } from "../models/individualContract.dto";
import { Contract } from "../../database/entities/contract.entity";


export const transformToContractDTO = async (contract: Contract): Promise<IndividualContractDTO> => {
            const contractInfo = (({ 
                id,
                borrowerFirstName,
                borrowerLastName,
                borrowerAge,
                startDate,
                contractEndDate }): any => ({         
                id,
                borrowerFirstName,
                borrowerLastName,
                borrowerAge,
                startDate,
                contractEndDate }))(contract);
            const carInfo = (({ brand, model }): any => ({ brand, model }))(contract.car);
            const tempPrice = (contract.car).className
            const {price} = tempPrice

            const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo, price};

    return individualContractFormated
}