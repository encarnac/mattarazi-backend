import { CollectionConfig } from "payload/types";

const Materials = {
  slug: "materials",
  admin: {
    useAsTitle: "name",
    group: "Form Options",
    pagination: { defaultLimit: 25 },
    defaultColumns: ["name"],
    description:
      "Material options refer to the type of fabric. Used in the Product form, under the 'color' drop-down selector.",
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

export default Materials;
