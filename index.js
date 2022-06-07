const express = require("express");
const { Server: ioServer } = require("socket.io");
const router = require("./routes/index");
const app = express();
const http = require("http");
const dayjs = require("dayjs");
const options = require("./dataBase/configDB");
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

const Contenedor = require("./Contenedor");

const productContainer = new Contenedor(options.mariaDB, "productos");
const messagesContainer = new Contenedor(options.sqlite, "mensajes");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));

io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado:", socket.id);

  socket.emit("messages", await messagesContainer.getAll());

  socket.on("newProduct", async (product) => {
    await productContainer.save(product);
    io.sockets.emit("products", productContainer);
  });

  socket.on("newMessage", async (message) => {
    await messagesContainer.save({
      ...message,
      date: dayjs().format("D/MM/YYYY hh:mm:ss"),
    });
    io.sockets.emit("messages", await messagesContainer.getAll());
  });
});

const routerEjs = express.Router();

routerEjs.get("/productos", async (req, res) => {
  const listaProductos = await productContainer.getAll();
  res.render(`${__dirname}/views/ejs/listaProductos.ejs`, { listaProductos });
});

app.use("/", routerEjs);
