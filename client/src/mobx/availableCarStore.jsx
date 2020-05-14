import { observable, action, autorun } from 'mobx'

class AvailableCarsStore {
    @observable cars= [];
    @observable searchString= '';
    @observable loading= false;
    @observable filterStrings= {
        brand: '',
        model: '',
        className: '',
      };
}

const availableCarStore = new AvailableCarsStore

export default availableCarStore
