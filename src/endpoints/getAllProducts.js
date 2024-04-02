import payload from "payload";

const getAllProducts = () => async (req, res, next) => {
  try {
    // Get the items
    const docs = await req.payload.find({
      collection: "products", // required
      depth: 2,
      sort: "-createdAt",
    });

    // Remove unwanted properties
    const newDocs = docs.docs?.map((doc) => ({
      Article: doc.article,
      Media: doc.media.map((media) => ({
        thumbnail: media.thumbnail,
      })),
      Model: doc.model.map((model) => ({
        name: model.name,
      })),
      Composition: doc.composition.map((composition) => ({
        composition: composition.composition,
      })),
      Color: doc.color.name,
      Pattern: doc.pattern.name,
      Category: doc.category.name,
    }));

    res.status(200).send(newDocs);
  } catch {
    throw new Error("Error fetching products");
  }
};

export default getAllProducts;
