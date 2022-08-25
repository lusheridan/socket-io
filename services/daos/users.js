const Contenedor = require("./Contenedor");

const usersContainer = new Contenedor("users", {
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = usersContainer;
