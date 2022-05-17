const express = require("express");
const router = require("./routes/index");
const Contenedor = require("./Contenedor");

const contenedor = new Contenedor("./productos.json");

const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));

const routerPug = express.Router();

routerPug.get("/productos/create", async (req, res) => {
  res.render(`${__dirname}/views/ejs/formularioProductos.ejs`);
});

routerPug.get("/productos", async (req, res) => {
  const listaProductos = await contenedor.getAll();
  res.render(`${__dirname}/views/ejs/listaProductos.ejs`, { listaProductos });
});

routerPug.post("/productos/create", async (req, res) => {
  const productos = req.body;
  await contenedor.save(productos);
  res.redirect("/productos");
});

app.use("/", routerPug);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => console.log("Server error", error));
