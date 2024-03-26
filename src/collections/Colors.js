import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import colorField from "../components/colorPicker/config";

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
        beforeValidate: [
          ({ value }) => {
            return value.toLowerCase();
          },
        ],
      },
    },
    colorField,
  ],
};

export default Colors;
