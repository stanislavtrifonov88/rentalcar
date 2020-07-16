import { observable, action, autorun } from "mobx";
import { CarInterface } from './interfaces'

class IndividualCarStore {
  @observable loading: boolean= false;
  @observable car: CarInterface = {
    id: "",
    brand: "",
    model: "",
    picture: "",
    className: "",
    price: 1,
  };
}

const individualCarStore = new IndividualCarStore();

export default individualCarStore;
