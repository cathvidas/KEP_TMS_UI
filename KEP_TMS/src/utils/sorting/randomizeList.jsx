const randomizeList = (list) => {
  list = list?.sort(() => Math.random() - 0.5);
  return list;
};
export default randomizeList;
