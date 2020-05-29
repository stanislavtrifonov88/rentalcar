const createList = (array, value) => {
    const title = 'None';
  
    const none = { value: title };
    const filterArray = array.map((curr) => {
      const singleItem = { value: curr[value] };
      return singleItem;
    });
    const a = [none, ...filterArray];
    const unique = [...new Set(a.map((item) => item.value))];
  
    return unique;
  };

export default createList;