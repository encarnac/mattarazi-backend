const getAllProducts = () => async (req, res, next) => {
  try {
    // Determine the type of query - whether general or specific or none
    let query;
    if (req.query.search && req.query.search !== "") {
      // Search for the query in the title, category, model, color, pattern, and composition fields
      query = [
        { title: { like: req.query.search } },
        { "category.name": { like: req.query.search } },
        { "model.name": { like: req.query.search } },
        { "color.name": { like: req.query.search } },
        { "pattern.name": { like: req.query.search } },
        { "composition.material": { like: req.query.search } },
      ];
    } else if (req.query) {
      // The field's property depends on the type as some are either "name" or "material"
      query = Object.entries(req.query).map(([field, value]) => ({
        [`${field}.${field === "composition" ? "material" : "name"}`]: {
          like: value,
        },
      }));
    } else {
      // Returns all products if no query is provided
      return;
    }

    // Get the items based on the query
    const docs = await req.payload.find({
      collection: "search", // required
      depth: 4,
      sort: "-createdAt",
      where: {
        or: query,
      },
    });

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

    // Send the filtered response
    res.status(200).send(newDocs);
  } catch {
    throw new Error("Error fetching products");
  }
};

export default getAllProducts;
