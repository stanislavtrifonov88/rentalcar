import { observable, action, autorun } from 'mobx'

class AvailableCarsStore {
    @observable cars= [{
      id: "b08ce9ff-9f8c-4795-9d55-36abda9045f4",
      brand: "Opel",
      model: "Corsa",
      picture: "http://localhost:3001/img/opelCorsa.jpeg",
      className: "A",
      price: 50,
    }];
    @observable searchString= '';
    @observable loading= false;
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

const store = window.store = new AvailableCarsStore

export default store
