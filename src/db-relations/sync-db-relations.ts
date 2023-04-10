import { Product, ProductImage, User } from "src/models";

export const syncDBRelations = () => {
  User.hasMany(Product, { onDelete: "CASCADE", foreignKey: "userId" });
  Product.belongsTo(User, { foreignKey: "userId" });
  Product.hasOne(ProductImage, { onDelete: "CASCADE", foreignKey: "productId" });
  ProductImage.belongsTo(Product, { foreignKey: "productId" });
};
