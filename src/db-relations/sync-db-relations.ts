import Product from "../models/product";
import ProductImage from "../models/product-image";

const syncDBRelations = () => {
  Product.hasOne(ProductImage, { onDelete: "CASCADE", constraints: true });
  ProductImage.belongsTo(Product);
};

export default syncDBRelations;
