import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import { transformLowercase } from "../hooks/transformCase";

const Compositions = {
  slug: "compositions",
  admin: {
    useAsTitle: "composition",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: ["percentage", "material", "createdAt"],
    description:
      "Compositions contain all the different materials that are used in your products' fabrics. They will be used in the Products Table as options in the 'Composition' selector, matching it with a specific product listing.",
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
      type: "row", // required
      fields: [
        // required
        {
          name: "percentage",
          type: "number",
          required: true,
          unique: false,
          min: 0,
          max: 100,
          admin: {
            step: 5,
            width: "50%",
          },
        },
        {
          name: "material",
          type: "text",
          required: true,
          unique: false,
          maxLength: 30,
          admin: {
            width: "50%",
          },
          hooks: {
            beforeChange: [transformLowercase],
          },
        },
        {
          name: "composition",
          type: "text",
          admin: {
            hidden: true, // hides the field from the admin panel
          },
          hooks: {
            beforeChange: [
              ({ siblingData }) => {
                // ensures data is not stored in DB
                delete siblingData["composition"];
              },
            ],
            afterRead: [
              ({ data }) => {
                return `${data.percentage}% ${data.material}`;
              },
            ],
          },
        },
      ],
    },
  ],
};

export default Compositions;
