import { observable, action, autorun } from 'mobx'

class DashboardStore {
    @observable contracts= [];
    @observable filteredList= [];
    @observable searchString= '';
    @observable loading= false;
    @observable filterStrings= {
      brand: '',
      model: '',
    };
}

const dashboardStore = new DashboardStore

export default dashboardStore
