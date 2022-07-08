const { faker } = require("@faker-js/faker");

const getProductosFaker = () => {
  let productos = [];
  for (let i = 0; i < 5; i++) {
    productos.push({
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
    });
  }
  return productos;
};

module.exports = { getProductosFaker };
