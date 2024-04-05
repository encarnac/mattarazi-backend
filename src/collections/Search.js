import { isAdminOrDev } from "../access/isAdminOrDev";

export const Search = {
  admin: {
    useAsTitle: "article",
    listSearchableFields: [
      "title",
      "category.name",
      "model.name",
      "color.name",
      "pattern.name",
      "composition.material",
    ],
    defaultColumns: [
      "article",
      "category",
      "model",
      "color",
      "pattern",
      "composition",
      "createdAt",
    ],
  },
  access: {
    read: () => true,
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  fields: [
    {
      name: "media",
      type: "array",
      admin: { readOnly: true },
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "photos",
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "model",
      type: "relationship",
      relationTo: "models",
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "color",
      type: "relationship",
      relationTo: "colors",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "pattern",
      type: "relationship",
      relationTo: "patterns",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "composition",
      type: "relationship",
      relationTo: "compositions",
      hasMany: true,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export const beforeSyncSearch = ({ originalDoc, searchDoc }) => ({
  ...searchDoc,
  title: originalDoc?.article || "",
  media: originalDoc?.media || [],
  photo: originalDoc?.media.photo || [],
  category: originalDoc?.category || "",
  model: originalDoc?.model || [],
  color: originalDoc?.color || "",
  pattern: originalDoc?.pattern || "",
  composition: originalDoc?.composition || [],
});
