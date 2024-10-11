export const mapProviderListToOptionFormat = (data) => {
    console.log(data)
    const mappedItem = data?.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  return mappedItem;
};
