import Joi from "joi"

const productSchema = Joi.object({
  product: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    stock: Joi.number().required().min(0),
    category: Joi.string()
      .valid(
        "Electronics",
        "Fashion",
        "Home",
        "Beauty",
        "Sports",
        "Books",
        "Toys",
        "Grocery",
        "Accessories"
      )
      .required(),
  }).required(),
});

export { productSchema }
