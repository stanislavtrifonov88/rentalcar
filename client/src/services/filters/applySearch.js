const applySearch = (arrayToFilter, searchString, filterProperties) => {
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

export default applySearch