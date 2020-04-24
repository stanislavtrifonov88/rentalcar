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
  let filteredArray = arrayToFilter;

  if (criteria.className) {
    filteredArray = filteredArray.filter((item) => item.className.toLowerCase().search(criteria.className.trim().toLowerCase()) !== -1);
  }
  filteredArray = filteredArray.filter((item) => item.brand.toLowerCase().search(criteria.brand.trim().toLowerCase()) !== -1);
  filteredArray = filteredArray.filter((item) => item.model.toLowerCase().search(criteria.model.trim().toLowerCase()) !== -1);

  // for (const [key, value] of Object.entries(criteria)) {
  // //     filteredArray = filteredArray.filter((item) => item[key].toLowerCase() === value.toLowerCase());
  // }

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
