const Contenedor = require("./Contenedor");

const productContainer = new Contenedor("productos", {
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});
const messagesContainer = new Contenedor("mensajes", {
  author: {
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
});
const usersContainer = new Contenedor("users", {
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = { productContainer, messagesContainer, usersContainer };
