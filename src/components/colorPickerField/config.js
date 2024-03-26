import { Field } from "payload/types";
import InputField from "./InputField";
import colorPickerCell from "./colorPickerCell";

export const validateHexColor = (value = "") => {
  return (
    value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null ||
    `Please give a valid hex color`
  );
};

const colorPickerField = {
  name: "sample",
  type: "text",
  validate: validateHexColor,
  required: false,
  admin: {
    components: {
      Field: InputField,
      Cell: colorPickerCell,
    },
  },
};

export default colorPickerField;
