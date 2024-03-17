import { CollectionConfig } from "payload/types";
import { isAdminOrDev } from "../access/isAdminOrDev";

const Media = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  admin: {
    group: "Form Options",
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
      name: "name",
      type: "text",
    },
  ],
};

export default Media;
