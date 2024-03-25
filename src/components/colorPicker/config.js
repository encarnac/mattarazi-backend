import { Field } from "payload/types";
import InputField from "./InputField";
import Cell from "./Cell";

export const validateHexColor = (value = "") => {
  return (
    value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null ||
    `Please give a valid hex color`
  );
};

const colorField = {
  name: "sample",
  type: "text",
  validate: validateHexColor,
  required: false,
  admin: {
    components: {
      Field: InputField,
      Cell: Cell,
    },
  },
};

export default colorField;
