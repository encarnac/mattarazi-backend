import payload from "payload";
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
      "media",
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
      name: "media",
      type: "array",
      label: "Media",
      maxRows: 3,
      labels: {
        singular: "Photo",
        plural: "Photos",
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            const filteredValue = value.filter(
              (val) => val.photo && val.photo !== null
            );
            if (filteredValue[0] && filteredValue[0].thumbnail) {
              delete filteredValue[0].thumbnail;
            }
            return filteredValue;
          },
        ],
        afterRead: [
          async ({ value }) => {
            // TO DO: Check if each photo exists and remove the ones that don't
            if (value[0] && value[0].photo) {
              const thumbnail = await payload.find({
                collection: "photos",
                where: {
                  id: {
                    equals: value[0].photo,
                  },
                },
              });

              // console.log(thumbnail); // Check if image found
              if (thumbnail && thumbnail.docs[0]) {
                value[0].thumbnail = thumbnail.docs[0].url;
                return value;
              }
            }
          },
        ],
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
          maxDepth: 1,
          required: false,
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
              maxDepth: 1,
              hasMany: true,
              required: true,
              index: true,
            },
            {
              name: "material",
              type: "relationship",
              relationTo: "materials",
              maxDepth: 1,
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
                  maxDepth: 1,
                  hasMany: false,
                  required: true,
                  index: true,
                },
                {
                  name: "pattern",
                  type: "relationship",
                  relationTo: "patterns",
                  maxDepth: 1,
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
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      maxDepth: 1,
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
