import { observable } from "mobx";
import { FilterStrings, ContractInterface } from "./interfaces";

class DashboardStore {
  @observable contracts: ContractInterface[] = [];
  @observable searchString: string = "";
  @observable loading: boolean = false;
  @observable filterStrings: FilterStrings = {
    brand: "",
    model: "",
  };
}

const dashboardStore = new DashboardStore();

export default dashboardStore;
