import { Car } from "../../database/entities/car.entity";
import { IndividualCarDTO } from "../models/individualCar.dto";

export const transformToCarDTO = async (individualCar: Car) => {
    const carPropsPicked = (({ id, brand, model, picture, }) => ({ id, brand, model, picture, }))(individualCar);
    const classPropsPicked = (({ className, price }) => ({ className, price }))(await individualCar.className);
    const individualCarFormated: IndividualCarDTO = { ...carPropsPicked, ...classPropsPicked};

    return individualCarFormated
}