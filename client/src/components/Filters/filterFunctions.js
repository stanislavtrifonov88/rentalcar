export const createList = (array, key, value) => {
  const title = 'None';

  const none = { key: '1', value: title };
  const filterArray = array.map((curr) => {
    const singleItem = { key: curr[key], value: curr[value] };
    return singleItem;
  });

  return [none, ...filterArray];
};


export const applyFilters = (arrayToFilter, criteria) => {
  let filteredArray = [];
  for (const [key, value] of Object.entries(criteria)) {
    filteredArray = arrayToFilter.filter((item) => item[key].toLowerCase().search(value.toLowerCase()) !== -1);
  }

  return filteredArray;
};

export const applySearch = (arrayToFilter, searchString, filterProperties) => {
  const filteredArray = filterProperties.map((property) => {
    const filters = arrayToFilter.filter((item) => (
      item[property].toLowerCase().search(searchString.trim().toLowerCase()) !== -1));
    const newArray = filters.flat();

    return newArray;
  });
  const arrayAfterFilters = filteredArray.flat();
  const arrayWithUniqueItems = [...new Set(arrayAfterFilters)];
  return arrayWithUniqueItems;
};
