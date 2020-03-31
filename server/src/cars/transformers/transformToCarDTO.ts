import { Car } from "../../database/entities/car.entity";
import { IndividualCarDTO } from "../models/individualCar.dto";

export const transformToCarDTO = async (individualCar: Car): Promise<IndividualCarDTO> => {
    const carPropsPicked = (({ id, brand, model, picture, }): any => ({ id, brand, model, picture, }))(individualCar);
    const classPropsPicked = (({ className, price }): any => ({ className, price }))(individualCar.className);
    const individualCarFormated: IndividualCarDTO = { ...carPropsPicked, ...classPropsPicked};

    return individualCarFormated
}