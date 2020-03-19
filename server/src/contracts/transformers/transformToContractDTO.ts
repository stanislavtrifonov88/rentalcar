import { IndividualContractDTO } from "../models/individualContract.dto";
import { Contract } from "../../database/entities/contract.entity";


export const transformToContractDTO = async (contract: Contract) => {
    const contractInfo = (({ 
        id,
        borrowerFirstName,
        borrowerLastName,
        borrowerAge,
        startDate,
        contractEndDate }) => ({         
        id,
        borrowerFirstName,
        borrowerLastName,
        borrowerAge,
        startDate,
        contractEndDate }))(contract);
    const carInfo = (({ brand, model }) => ({ brand, model }))(await contract.car);
    const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo };

    return individualContractFormated
}