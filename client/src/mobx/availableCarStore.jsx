import { observable, action, autorun } from 'mobx'

class AvailableCarsStore {
    @observable cars= [];
    @observable searchString= '';
    @observable filterStrings= {
        brand: '',
        model: '',
        className: '',
      };
    @observable filters= {
        brand: { isOpen: false },
        class: { isOpen: false },
        model: { isOpen: false },
      };
}

const availableCarStore = new AvailableCarsStore

export default availableCarStore
