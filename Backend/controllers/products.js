import Product from "../models/product.js";

let index = async (req, res) => {
  const products = await Product.find();

  if (req.query.search) {
    let filterProducts1 = products.filter((product) =>
      product.name.includes(req.query.search.trim()),
    );
    return res.status(200).json({
  success: true,
  products: filterProducts1,
});
  }
  if (req.query.category) {
    const filterProducts = products.filter(
      (product) => product.category.trim() === req.query.category.trim(),
    );
    return res.status(200).json({
      success: true,
      products: filterProducts,
    });
  }
  if (products.length === 0) {
    return res.status(200).json({
      success: true,
      products: [],
    });
  }
  res.status(200).json({
    success: true,
    products: products,
  });
};

let showProduct = async (req, res) => {
  let { id } = req.params;
  let product = await Product.findById(id)
    .populate("owner");
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product you requested for dose not exist!",
    });
  }
  res.status(200).json({
    success: true,
    product: product,
  });
};

let createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body.product);

    newProduct.owner = req.user._id;
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Successfully Created!",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

let renderEditForm = async (req, res) => {
  let { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product you requested for dose not exist!",
    });
  }

  res.status(200).json({
    success: true,
    product: product,
  });
};

let updateProduct = async (req, res) => {
  let { id } = req.params;
  let product = await Product.findByIdAndUpdate(
    id,
    { ...req.body.product },
    { returnDocument: "after" }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    product.image = { url, filename };
    await product.save();
  }
  res.status(200).json({
    success: true,
    message: "Product Successfully Edited!",
    user: req.user,
    product,
  });
};

let destroyProduct = async (req, res) => {
  let { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Product Successfully Deleted  !",
  });
};

export default {
  index,
  renderEditForm,
  showProduct,
  createProduct,
  updateProduct,
  destroyProduct,
};
