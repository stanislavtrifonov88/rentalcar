import { Customer } from '../../database/entities/customer.entity';
import { IndividualCustomerDTO } from '../models/individualCustomerDTO';
import { differenceInYears } from '../../shared/constants/dateModifiers';

export const transformToCustomerDTO = async (
  customer: Customer,
): Promise<IndividualCustomerDTO> => {
  const customerPropsPicked = (({
    phone,
    firstName,
    lastName,
    birthdate,
  }): any => ({ phone, firstName, lastName, birthdate }))(customer);
  const contracts = Promise.resolve(customer.contracts);
  const previousContracts = (await contracts).length;
  const age = differenceInYears(customer.birthdate);

  const finalCustomerObject = {
    ...customerPropsPicked,
    age,
    previousContracts,
  };

  return finalCustomerObject;
};
