import { CollectionConfig } from "payload/types";
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
      "Pattern options refer to fabric design. Used in the Product form, under the 'color' drop-down selector.",
    components: {
      views: {
        Edit: {
          CreateNew: { Tab: CustomTabCreate },
        },
        // List: CustomListView,
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
