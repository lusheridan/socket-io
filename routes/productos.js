const { Router } = require("express");
const { productContainer } = require("../daos");
const { getProductosFaker } = require("../productosFaker");
const passport = require("passport");
const router = Router();

router.get("/productos-test", (req, res) => {
  return res.json(getProductosFaker());
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const productos = await productContainer.getById(id);

  if (productos) {
    return res.json(productos);
  }

  res.json({ error: "producto no encontrado" }, 404);
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await productContainer.deleteById(id);

  if (!result) {
    return res.json({ error: "producto no encontrado" }, 404);
  }

  res.json({ message: "producto borrado" });
});

router.delete("/", async (req, res) => {
  const result = await productContainer.deleteAll();

  if (!result) {
    return res.json({ error: "no hay productos" }, 404);
  }

  res.json({ message: "productos borrados" });
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const productos = await productContainer.editById(id, body);

  if (productos) {
    return res.json(productos);
  }

  res.json({ error: "producto no encontrado" }, 404);
});

router.get("/", async (req, res) => {
  const productos = await productContainer.getAll();
  res.json(productos);
});

router.post("/", async (req, res) => {
  const body = req.body;
  const { title, price, thumbnail } = body;
  const nuevoProducto = await productContainer.save({
    title,
    price,
    thumbnail,
  });

  res.json(nuevoProducto);
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/errorRegister",
    successRedirect: "/login",
  })
);

router.get("/errorRegister", (req, res) => {
  res.render("errorRegister");
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/errorCredentials",
    successRedirect: "/productos",
  })
);

router.get("/errorCredentials", (req, res) => {
  res.render("errorCredentials");
});

module.exports = router;
