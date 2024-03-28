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
      "photo",
      "slideshow",
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
      name: "slideshow",
      type: "array",
      label: "Photo(s)",
      maxRows: 3,
      labels: {
        singular: "Photo",
        plural: "Photos",
      },
      hooks: {
        afterRead: [
          async ({ value }) => {
            const update = value.forEach(async (val) => {
              console.log("!!beforeVALUE:   ", val);
              const thumbnail = await payload.find({
                collection: "photos",
                where: {
                  id: {
                    equals: val.photo,
                  },
                },
              });

              console.log("!!thumbnail:   ", thumbnail.docs[0].url);
              val.thumbnail = thumbnail.docs[0].url;
              console.log("!!update:   ", val);
            });
            console.log("!!complete update:   ", update);
            return update;
          },
        ],
      },
      admin: {
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
          maxDepth: 3,
          required: false,
          // admin: {
          //   components: {
          //     Cell: PhotoCell,
          //   },
          // },
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
              maxDepth: 3,
              hasMany: true,
              required: true,
              index: true,
            },
            {
              name: "material",
              type: "relationship",
              relationTo: "materials",
              maxDepth: 3,
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
                  maxDepth: 3,
                  hasMany: false,
                  required: true,
                  index: true,
                },
                {
                  name: "pattern",
                  type: "relationship",
                  relationTo: "patterns",
                  maxDepth: 3,
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
      maxDepth: 3,
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
