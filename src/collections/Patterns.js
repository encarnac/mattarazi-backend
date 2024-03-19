import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Patterns = {
  slug: "patterns",
  admin: {
    useAsTitle: "name",
    group: "Options",
    pagination: { defaultLimit: 25 },
    defaultColumns: ["name", "createdAt"],
    description:
      "Pattern options refer to fabric design. Used in the Product form, under the 'color' drop-down selector.",
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
