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
    const a = await (await contract.car).className
    const price = a.price
    const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo, price };

    return individualContractFormated
}