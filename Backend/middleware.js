import Product from "./models/product.js";
import ExpressError from "./utils/ExpressError.js";
import { productSchema } from "./schema.js";

const isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl.replace("/api", "");

    return res.status(401).json({
      success: false,
      redirectUrl: req.originalUrl,
      message: "You must be Logged in to any change on product!",
    });
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  let { id } = req.params;
  let product = await Product.findById(id);
  if (!product.owner._id.equals(req.user._id)) {
    return res.status(401).json({
      success: false,
      message: "You are not the owner of this product",
      product,
    });
  }
  next();
};

const validateProduct = (req, res, next) => {
  let { error } = productSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

export {
  isLoggedin,
  saveRedirectUrl,
  isOwner,
  validateProduct,
};
