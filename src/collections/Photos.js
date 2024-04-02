import { isAdminOrDev } from "../access/isAdminOrDev";
import { CustomTabCreate } from "../components/CustomTabCreate";

const Photos = {
  slug: "photos",
  admin: {
    useAsTitle: "filename",
    group: "Options",
    pagination: { defaultLimit: 25 },
    hideAPIURL: true,
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
      "Photos contains all the images of the products in your inventory. They will be used in the Products Table as options in the 'Image' selector, matching it with a specific product listing.",
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
  upload: {
    formatOptions: { format: "webp" },
    resizeOptions: { width: 800 },
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "caption",
      type: "text",
      maxLength: 100,
    },
  ],
};

export default Photos;
