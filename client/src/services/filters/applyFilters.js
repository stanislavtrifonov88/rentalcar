const applyFilters = (arrayToFilter, criteria) => {
  let filteredArray = arrayToFilter;
  if (criteria.className) {
    filteredArray = filteredArray.filter((item) => item.className.toLowerCase().search(criteria.className.trim().toLowerCase()) !== -1);
  }
  filteredArray = filteredArray.filter((item) => item.brand.toLowerCase().search(criteria.brand.trim().toLowerCase()) !== -1);
  filteredArray = filteredArray.filter((item) => item.model.toLowerCase().search(criteria.model.trim().toLowerCase()) !== -1);

  return filteredArray;
};

export default applyFilters;
