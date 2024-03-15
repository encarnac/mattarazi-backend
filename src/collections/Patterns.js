import { CollectionConfig } from "payload/types";

const Patterns = {
  slug: "patterns",
  admin: {
    useAsTitle: "name",
    group: "Form Options",
    pagination: { defaultLimit: 25 },
    defaultColumns: ["name"],
    description:
      "Pattern options refer to fabric design. Used in the Product form, under the 'color' drop-down selector.",
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

export default Patterns;
