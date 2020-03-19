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
            const tempPrice = (contract.car).className
            const price = tempPrice.price

            const individualContractFormated: IndividualContractDTO = { ...contractInfo, ...carInfo, price};

    return individualContractFormated
}