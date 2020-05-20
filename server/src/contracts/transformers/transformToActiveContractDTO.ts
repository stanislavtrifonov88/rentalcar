import { Contract } from '../../database/entities/contract.entity';
import { transformToContractDTO } from './transformToContractDTO';
import { transformToCustomerDTO } from '../../customers/transformers/transformToCustomerDTO';
import { Customer } from '../../database/entities/customer.entity';
import { ActiveContractDTO } from '../models/activeContractDTO.dto';

export const transformToActiveContractDTO = async (
  contract: Contract,
  customer: Customer,
  transformToStandardContractDTO = transformToContractDTO,
  transformToStandardCustomerDTO = transformToCustomerDTO,
): Promise<ActiveContractDTO> => {
  const contractDTO = await transformToStandardContractDTO(contract);
  const customerDTO = await transformToStandardCustomerDTO(customer);
  console.log(contractDTO)
  const { previousContracts } = customerDTO;
  const mergedObj: ActiveContractDTO = { ...contractDTO, ...customerDTO, previousContracts};

  return mergedObj;
};
