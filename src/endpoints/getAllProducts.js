import qs from "qs";

const getAllProducts = () => async (req, res, next) => {
  try {
    const query = req.query.search;
    console.log(query);

    // Get the items
    const docs = await req.payload.find({
      collection: "search", // required
      depth: 4,
      sort: "-createdAt",
      where: {
        or: [
          { title: { like: query } },
          { "category.name": { like: query } },
          { "model.name": { like: query } },
          { "color.name": { like: query } },
          { "pattern.name": { like: query } },
          { "composition.material": { like: query } },
        ],
      },
    });

    console.log(docs.docs);
    // Remove unwanted properties
    const newDocs = docs.docs?.map((doc) => ({
      Article: doc.title,
      Media: doc.media.map((media) => media.photo.url),
      Model: doc.model.map((model) => model.name),
      Composition: doc.composition.map(
        (composition) => composition.composition
      ),
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
