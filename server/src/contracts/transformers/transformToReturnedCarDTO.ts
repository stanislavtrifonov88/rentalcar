import { Contract } from '../../database/entities/contract.entity';
import { Car } from '../../database/entities/car.entity';
import { transformToContractDTO } from './transformToContractDTO';
import { transformToCarDTO } from '../../cars/transformers/transformToCarDTO';
import { transformToCustomerDTO } from '../../customers/transformers/transformToCustomerDTO';
import { Customer } from '../../database/entities/customer.entity';
import { ReturnedCarDTO } from '../models/returnedCarDTO.dto';

export const transformToReturnedCarDTO = async (
  contract: Contract,
  car: Car,
  customer: Customer,
  transformToStandardContractDTO = transformToContractDTO,
  transformToStandardCarDTO = transformToCarDTO,
  transformToStandardCustomerDTO = transformToCustomerDTO,
): Promise<ReturnedCarDTO> => {
  const contractDTO = await transformToStandardContractDTO(contract);
  const carDTO = await transformToStandardCarDTO(car);
  const customerDTO = await transformToStandardCustomerDTO(customer);
  const mergedObj = { ...contractDTO, ...carDTO, ...customerDTO };
  const returnedCarInfo = (({
    startDate,
    contractEndDate,
    phone,
    age,
    price,
    previousContracts,
  }): ReturnedCarDTO => ({
    startDate,
    contractEndDate,
    phone,
    age,
    price,
    previousContracts,
  }))(mergedObj);

  return returnedCarInfo;
};
