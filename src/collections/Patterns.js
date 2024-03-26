import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";

const Patterns = {
  slug: "patterns",
  admin: {
    useAsTitle: "name",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: ["name", "createdAt"],
    description:
      "Patterns contains all the available pattern designs used in your products' fabrics. They will be used in the Products Table as options in the 'Pattern' selector, matching it with a specific product listing.",
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
  ],
};

export default Patterns;
