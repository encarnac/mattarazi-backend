import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Categories = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    group: "Form Options",
    pagination: { defaultLimit: 25 },
    defaultColumns: ["name", "createdAt"],
    description:
      "Category options are used in the Product form, under the 'categories' drop-down selector.",
    // components: {
    //   edit: {
    //     SaveButton: CustomSaveButton,
    //   },
    // },
  },
  access: {
    read: () => true,
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  // hooks: { afterChange: [returnToTable] },
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

export default Categories;
