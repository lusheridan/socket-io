const { Router } = require("express");
const Contenedor = require("../contenedor");

const router = Router();
const contenedor = new Contenedor("./productos.json");

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const productos = await contenedor.getById(id);

  if (productos) {
    return res.json(productos);
  }

  res.json({ error: "producto no encontrado" }, 404);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await contenedor.deleteById(id);

  if (!result) {
    return res.json({ error: "producto no encontrado" }, 404);
  }

  res.json({ message: "producto borrado" });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const productos = await contenedor.editById(id, body);

  if (productos) {
    return res.json(productos);
  }

  res.json({ error: "producto no encontrado" }, 404);
});

router.get("/", async (req, res) => {
  const productos = await contenedor.getAll();
  res.json(productos);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const { title, price, thumbnail } = body;
  const nuevoProducto = await contenedor.save({
    title,
    price,
    thumbnail,
  });

  res.json(nuevoProducto);
});

module.exports = router;
