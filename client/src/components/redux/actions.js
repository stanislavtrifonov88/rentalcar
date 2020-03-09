import SEARCH_WORD from './actionTypes';


const searchWord = (content) => ({
  type: SEARCH_WORD,
  payload: {
    content,
  },
});

export default searchWord;
