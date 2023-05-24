import { Category, Product, ProductImage, User } from "src/models";
import { Cart } from "src/models/cart";
import { CartItems } from "src/models/cart-items";

export const syncDBRelations = () => {
  User.hasMany(Product, { onDelete: "CASCADE", foreignKey: "userId" });
  Product.belongsTo(User, { foreignKey: "userId" });
  Product.hasOne(ProductImage, { onDelete: "CASCADE", foreignKey: "productId" });
  ProductImage.belongsTo(Product, { foreignKey: "productId" });
  Category.hasMany(Product, { onDelete: "SET NULL", foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });
  User.hasOne(Cart, { onDelete: "CASCADE", foreignKey: "userId" });
  Cart.belongsTo(User, { onDelete: "SET NULL", foreignKey: "userId" });

  CartItems.hasMany(Product, { foreignKey: "productId" });
  // Product.belongsToMany(CartItems, { through: "cart-items" });
};
