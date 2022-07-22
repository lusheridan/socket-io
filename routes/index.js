const { Router } = require("express");
const productosRoutes = require("./productos");
const randomsRoutes = require("./randoms");

const router = Router();

router.use("/productos", productosRoutes);
router.use("/randoms", randomsRoutes);

module.exports = router;
