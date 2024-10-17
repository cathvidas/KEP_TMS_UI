const sortArrayInDescending = (items) => {
  const newlist = [];
  let curIndex = items.length;
  while (curIndex > 0) {
    items.forEach((e, i) => {
      if (i === curIndex - 1) {
        newlist.push(e);
      }
    });
    curIndex--;
  }
  return newlist;
};

export default sortArrayInDescending;
