const Media = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  upload: {
    imageSizes: [
      {
        name: "thumbnail",
        width: 250,
        height: 250,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
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
