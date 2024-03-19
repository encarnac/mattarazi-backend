import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Photos = {
  slug: "photos",
  admin: {
    // useAsTitle: "filename",
    group: "Product Catalog",
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
    formatOptions: { format: "png", options: { compressionLevel: 3 } },
    resizeOptions: { width: 300 },
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
