import { Customer } from "../../database/entities/customer.entity";
import { IndividualCustomerDTO } from "../models/individualCustomerDTO";
import { loyaltyDiscount, geoDiscount } from "../../shared/calculations/loyaltyCalculations";
import { differenceInYears } from "../../shared/constants/dateModifiers";


export const transformToCustomerDTO = async (customer: Customer): Promise<IndividualCustomerDTO> => {
    const customerPropsPicked = (({ phone, firstName, lastName, birthdate }): any => ({ phone, firstName, lastName, birthdate }))(customer);
    const loyaltyDiscountPercent = loyaltyDiscount(customer);
    const geoDiscountPercent = geoDiscount(customer);
    const age = differenceInYears(customer.birthdate)

    const finalCustomerObject = {...customerPropsPicked, age ,loyaltyDiscount: loyaltyDiscountPercent, geoDiscount: geoDiscountPercent}

    return finalCustomerObject
}