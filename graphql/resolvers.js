const productContainer = require("../services/daos/products");

module.exports = {
  Query: {
    getAllProducts: () => {
      return productContainer.getAll();
    },
  },
  Mutation: {
    addProduct: async (_, { input }) => {
      return productContainer.save(input);
    },
    deleteProduct: async (_, { id }) => {
      return await productContainer.deleteById(id);
    },
    updateProduct: async (_, { id, input }) => {
      return productContainer.editById(id, input);
    },
  },
};
