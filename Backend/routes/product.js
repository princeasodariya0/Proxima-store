import express from "express"
const router = express.Router();
import { isLoggedin, isOwner, validateProduct } from "../middleware.js";
import wrapAsync from "../utils/wrapAsync.js"
import productController from "../controllers/products.js";

router
  .route("/")
  .get(wrapAsync(productController.index))
  
router
  .route("/create")
  .post(
    isLoggedin,
    validateProduct,
    wrapAsync(productController.createProduct)
  );


router
  .route("/:id")
  .get(wrapAsync(productController.showProduct))
  .put(
    isLoggedin,
    isOwner,
    validateProduct,
    wrapAsync(productController.updateProduct)
  )
  .delete(isLoggedin, isOwner, wrapAsync(productController.destroyProduct));


export default router;
