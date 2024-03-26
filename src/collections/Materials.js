import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";

const Materials = {
  slug: "materials",
  admin: {
    useAsTitle: "name",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: ["name", "createdAt"],
    description:
      "Materials contain all the different materials that are used in your products' fabrics. They will be used in the Products Table as options in the 'Material' selector, matching it with a specific product listing.",
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
        beforeChange: [
          ({ value }) => {
            return value.toLowerCase();
          },
        ],
      },
    },
  ],
};

export default Materials;
