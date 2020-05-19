import { Contract } from '../../database/entities/contract.entity';
import { Car } from '../../database/entities/car.entity';
import { transformToContractDTO } from './transformToContractDTO';
import { transformToCarDTO } from '../../cars/transformers/transformToCarDTO';
import { transformToCustomerDTO } from '../../customers/transformers/transformToCustomerDTO';
import { Customer } from '../../database/entities/customer.entity';
import { ActiveContractDTO } from '../models/activeContractDTO.dto';

export const transformToActiveContractDTO = async (
  contract: Contract,
  car: Car,
  customer: Customer,
  transformToStandardContractDTO = transformToContractDTO,
  transformToStandardCarDTO = transformToCarDTO,
  transformToStandardCustomerDTO = transformToCustomerDTO,
): Promise<ActiveContractDTO> => {
  const contractDTO = await transformToStandardContractDTO(contract);
  const carDTO = await transformToStandardCarDTO(car);
  const customerDTO = await transformToStandardCustomerDTO(customer);
  const { id } = contractDTO;
  const mergedObj = { ...contractDTO, ...carDTO, ...customerDTO, id };

  return mergedObj;
};
