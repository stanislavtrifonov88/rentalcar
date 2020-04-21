
const createList = (array, key, value) => array.map((curr) => {
  const singleItem = { key: curr[key], value: curr[value] };
  return singleItem;
});

export default createList;
