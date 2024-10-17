export const mapProviderListToOptionFormat = (data) => {
    const mappedItem = data?.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  return mappedItem;
};
