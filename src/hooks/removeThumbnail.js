import payload from "payload";

const removeThumbnail = async ({ value }) => {
  // Find the URL of each photo ID in the array
  const promises = value.map(async (val) => {
    if (val.photo && val.photo !== null) {
      let thumbnail = await payload.find({
        collection: "photos",
        where: {
          id: {
            equals: val.photo,
          },
        },
      });

      if (thumbnail.totalDocs > 0) {
        return thumbnail.docs.map((doc) => doc.url).toString();
      }
      return null;
    }
  });

  // const promises = value.map(async (val) => {
  //   if (val.photo && val.photo !== null) {
  //     let thumbnail = await payload.find({
  //       collection: "photos",
  //       where: {
  //         id: {
  //           equals: val.photo,
  //         },
  //       },
  //     });

  //     if (thumbnail.totalDocs > 0) {
  //       return {
  //         url: thumbnail.docs[0].url.toString(),
  //         id: thumbnail.docs[0].id.toString(),
  //       };
  //     }
  //     return null;
  //   }
  // });

  const urls = await Promise.all(promises);

  // TO DO: MATCH THE RIGHT URL WITH THE RIGHT PHOTO/INDEX
  const newValue = value
    .map((val, index) => {
      return { ...val, thumbnail: urls[index] };
    })
    .filter((val) => val.thumbnail !== null);

  return newValue;
};

export default removeThumbnail;
