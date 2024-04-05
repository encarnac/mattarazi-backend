import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import { transformLowercase } from "../hooks/transformCase";

const Categories = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: ["name", "createdAt"],
    listSearchableFields: ["name"],
    description:
      "Categories contain all the different types of products in your inventory. They will be used in the Products Table as options in the 'Category' selector, matching it with a specific product listing.",
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
  // hooks: { afterChange: [returnToTable] },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
      maxLength: 30,
      index: true,
      hooks: {
        beforeChange: [transformLowercase],
      },
    },
  ],
};

export default Categories;
