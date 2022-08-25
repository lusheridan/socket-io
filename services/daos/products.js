const Contenedor = require("../Contenedor");

const productContainer = new Contenedor("productos", {
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

module.exports = productContainer;
