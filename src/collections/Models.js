import { CollectionConfig } from "payload/types";

const Models = {
  slug: "models",
  admin: {
    useAsTitle: "name",
    group: "Form Options",
    pagination: { defaultLimit: 25 },
    defaultColumns: ["name"],
    description:
      "Model options refer to the fit of tops (e.g. jackets, suits, shirts, etc.). Used in the Product form, under the 'fit' drop-down selector.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            // Trim whitespace and convert to lowercase
            return value.toLowerCase();
          },
        ],
      },
    },
  ],
};

export default Models;
