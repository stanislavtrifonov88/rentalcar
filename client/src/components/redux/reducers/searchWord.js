
import SEARCH_WORD from '../actionTypes';

const initialState = {
  searchWord: '',
};

const searchWord = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_WORD:
      return {
        ...state,
        searchWord: action.searchedWord,
      };
    default:

      return state;
  }
};

export default searchWord;
