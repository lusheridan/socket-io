const { Router } = require("express");
const productosRoutes = require("./productos");

const router = Router();

router.use("/productos", productosRoutes);

module.exports = router;
