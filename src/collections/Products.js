import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";
import { PhotoCell } from "../components/photoField/PhotoCell";
import { statusCell } from "../components/statusField/statusCell";
import { transformUppercase } from "../hooks/transformCase";
import getThumbnail from "../hooks/getThumbnail";
import removeThumbnail from "../hooks/removeThumbnail";
import getCurrentDate from "../hooks/getCurrentDate";

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
      "media",
      "category",
      "model",
      "color",
      "pattern",
      "composition",
      "published",
    ],
    listSearchableFields: [
      "article",
      "category",
      "model",
      "color",
      "pattern",
      "composition",
      "category.name",
      "model.name",
      "color.name",
      "pattern.name",
      "composition.material",
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
      name: "article",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeChange: [transformUppercase],
      },
    },
    {
      name: "media",
      type: "array",
      label: "Media",
      maxRows: 3,
      labels: {
        singular: "Photo",
        plural: "Photos",
      },
      hooks: {
        beforeChange: [getThumbnail],
        afterRead: [removeThumbnail],
      },
      admin: {
        initCollapsed: false,
        components: {
          Cell: PhotoCell,
          RowLabel: ({ data, index }) => {
            return data?.title || `Photo ${String(index).padStart(2, "0")}`;
          },
        },
      },
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "photos",
          maxDepth: 2,
          required: false,
          index: true,
        },
        {
          label: "caption",
          name: "alt",
          type: "text",
        },
      ],
    },

    // PRODUCT DETAILS GROUP
    {
      type: "tabs",
      tabs: [
        {
          label: "Product Details",
          fields: [
            {
              name: "model",
              type: "relationship",
              relationTo: "models",
              maxDepth: 2,
              hasMany: true,
              required: true,
              index: true,
            },
            {
              name: "composition",
              type: "relationship",
              relationTo: "compositions",
              maxDepth: 2,
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
                  maxDepth: 2,
                  hasMany: false,
                  required: true,
                  index: true,
                },
                {
                  name: "pattern",
                  type: "relationship",
                  relationTo: "patterns",
                  maxDepth: 2,
                  hasMany: false,
                  required: true,
                  index: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // SIDEBAR
    {
      name: "publishedOn",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeChange: [getCurrentDate],
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      maxDepth: 2,
      hasMany: false,
      required: true,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "published",
      type: "ui",
      admin: {
        components: {
          Cell: statusCell,
        },
      },
    },
  ],
};

export default Products;
