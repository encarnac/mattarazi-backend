import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import colorPickerCell from "../components/colorPickerField/config";
import { transformLowercase } from "../hooks/transformCase";

const Colors = {
  slug: "colors",
  admin: {
    useAsTitle: "name",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: ["name", "sample", "createdAt"],
    description:
      "Colors contain all the common color themes found in your products. They will be used in the Products Table as options in the 'Color' selector, matching it with a specific product listing.",
    components: {
      views: {
        Edit: {
          CreateNew: { Tab: CustomTabCreate },
        },
      },
    },
  },
  access: {
    read: () => true,
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      maxLength: 30,
      hooks: {
        beforeChange: [transformLowercase],
      },
    },
    colorPickerCell,
  ],
};

export default Colors;
