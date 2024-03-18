import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Photos = {
  slug: "photos",
  admin: {
    // useAsTitle: "filename",
    group: "Manage Product Catalog",
    pagination: { defaultLimit: 25 },
    defaultColumns: [
      "filename",
      "createdAt",
      "mimeType",
      "fileSize",
      "width",
      "height",
      "url",
    ],
    description:
      "Media uploaded is used as options for the 'image' selector when creating a new Product.",
  },
  access: {
    read: () => true,
    create: isAdminOrDev,
    update: isAdminOrDev,
    delete: isAdminOrDev,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "caption",
      type: "text",
      unique: true,
    },
  ],
};

export default Photos;
