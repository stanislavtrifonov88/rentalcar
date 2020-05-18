import { observable, action, autorun } from "mobx";

class IndividualCarStore {
  @observable loading = false;
  @observable car = {
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
