import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Products = {
  slug: "products",
  admin: {
    useAsTitle: "article",
    group: "Manage Product Catalog",
    pagination: { defaultLimit: 25 },
    listSearchableFields: [
      "article",
      "category",
      "model",
      "color",
      "pattern",
      "material",
    ],
    defaultColumns: [
      "image",
      "article",
      "category",
      "model",
      "color",
      "pattern",
      "material",
    ],
    description:
      "Products refer to items on sale that are to be displayed and listed on the website.",
  },
  access: {
    read: () => true,
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  fields: [
    {
      name: "image", // required
      type: "upload", // required
      relationTo: "media", // required
      required: true,
    },
    {
      name: "article",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
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
      required: true,
    },
    {
      name: "model",
      type: "relationship",
      relationTo: "models",
      hasMany: true,
      required: true,
    },
    {
      type: "row", // required
      fields: [
        {
          name: "color",
          type: "relationship",
          relationTo: "colors",
          required: true,
        },
        {
          name: "pattern",
          type: "relationship",
          relationTo: "patterns",
          required: true,
        },
        {
          name: "material",
          type: "relationship",
          relationTo: "materials",
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
};

export default Products;
