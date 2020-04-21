export const createList = (array, key, value) => {
  const none = { key: '1', value: 'None' };
  const filterArray = array.map((curr) => {
    const singleItem = { key: curr[key], value: curr[value] };
    return singleItem;
  });
  return [none, ...filterArray];
};


export const filterByCriteria = (filteredArray, originalArray, criteria, property) => {
  const filterCriteria = criteria.value.trim().toLowerCase();
  let arrayToFilter = [];
  if (filteredArray.length === 0) {
    arrayToFilter = originalArray;
  } else {
    arrayToFilter = filteredArray;
  }


  arrayToFilter = arrayToFilter.filter((item) => item[property].toLowerCase().search(filterCriteria) !== -1);

  return arrayToFilter;
};
