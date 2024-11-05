import { authController } from "../controllers/authController.js";
import { productController } from "../controllers/productController.js";


const resolvers = {
  Query: {
    products: async () => prismaClient.product.findMany(),
    product: async (_, { id }) => prismaClient.product.findUnique({ where: { id: parseInt(id) } }),
    myProducts: async (_, __, { userId }) => prismaClient.product.findMany({ where: { ownerId: userId } })
  },

  Mutation: {
    register: authController.register,
    login: authController.login,
    createProduct: productController.createProduct,
    updateProduct: productController.updateProduct,
    deleteProduct: productController.deleteProduct,
    buyProduct: productController.buyProduct,
    rentProduct: productController.rentProduct,
  },
};

export default resolvers;
