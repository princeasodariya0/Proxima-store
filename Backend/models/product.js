import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Electronics",
      "Fashion",
      "Home",
      "Beauty",
      "Sports",
      "Books",
      "Toys",
      "Grocery",
      "Accessories",
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
