const getThumbnail = ({ value }) => {
  const filteredValue = value.filter((val) => val.photo && val.photo !== null);
  if (filteredValue[0] && filteredValue[0].thumbnail) {
    delete filteredValue[0].thumbnail;
  }
  return filteredValue;
};

export default getThumbnail;
