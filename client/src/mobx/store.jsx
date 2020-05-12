import { observable, action, autorun } from 'mobx'

class TodoStore {
    @observable cars= [];
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

const store = window.store = new TodoStore

export default store

autorun(() => {
    console.log(store.filter)
    console.log(store.todos[0])
})