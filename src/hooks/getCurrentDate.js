const getCurrentDate = ({ siblingData, value }) => {
  if (siblingData._status === "published" && !value) {
    return new Date();
  }
  return value;
};

export default getCurrentDate;
