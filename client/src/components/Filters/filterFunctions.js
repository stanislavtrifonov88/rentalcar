export const createList = (array, value) => {
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
