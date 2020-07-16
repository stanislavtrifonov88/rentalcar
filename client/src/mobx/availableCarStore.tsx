import { observable, action, autorun } from "mobx";
import { FilterStrings, CarInterface } from "./interfaces";


class AvailableCarsStore {
  @observable cars: CarInterface[] = [];
  @observable searchString: string = "";
  @observable loading: boolean = false;
  @observable filterStrings: FilterStrings = {
    brand: "",
    model: "",
    className: "",
  };
}

const availableCarStore = new AvailableCarsStore();

export default availableCarStore;
