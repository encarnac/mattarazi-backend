import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import { PhotoCell } from "../components/photoField/PhotoCell";
import { statusCell } from "../components/statusField/statusCell";

const Products = {
  slug: "products",
  versions: {
    drafts: true,
    maxPerDoc: 2,
  },
  admin: {
    useAsTitle: "article",
    group: "Inventory",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
    defaultColumns: [
      "article",
      "image",
      "category",
      "model",
      "color",
      "pattern",
      "material",
      "published",
    ],
    description:
      "Products contains all the goods in your store's inventory. Only items that have the status of 'Published' will be displayed on the public website for customers to browse.",
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
    read: ({ req }) => {
      if (req.user) return true;
      return {
        _status: {
          equals: "published",
        },
      };
    },
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "photos",
      required: false,
      admin: {
        components: {
          Cell: PhotoCell,
        },
      },
    },
    {
      name: "article",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeChange: [
          ({ value }) => {
            return value.toUpperCase();
          },
        ],
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
      index: true,
    },
    {
      name: "model",
      type: "relationship",
      relationTo: "models",
      hasMany: true,
      required: true,
      index: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "color",
          type: "relationship",
          relationTo: "colors",
          hasMany: false,
          required: true,
          index: true,
        },
        {
          name: "pattern",
          type: "relationship",
          relationTo: "patterns",
          hasMany: false,
          required: true,
          index: true,
        },
        {
          name: "material",
          type: "relationship",
          relationTo: "materials",
          hasMany: true,
          required: true,
          index: true,
        },
      ],
    },
    {
      name: "published",
      type: "text",
      admin: {
        readOnly: true,
        components: {
          Cell: statusCell,
        },
      },
    },
  ],
};

export default Products;
