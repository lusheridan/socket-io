const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const app = express();
const http = require("http");
const { normalize, schema } = require("normalizr");

const { productContainer, messagesContainer } = require("./daos");
const httpServer = http.createServer(app);
const { Server: ioServer } = require("socket.io");
const { getProductosFaker } = require("./productosFaker");
const io = new ioServer(httpServer);

dotenv.config();

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));

const authorSchema = new schema.Entity("authors");
const messageSchema = new schema.Entity("messages", { author: authorSchema });

const getNormalizedMessages = async () => {
  const messages = await messagesContainer.getAll();
  const parseMessages = messages.map((msj) => {
    return {
      ...msj.toObject(),
      id: msj._id.toString(),
    };
  });

  return normalize(parseMessages, [messageSchema]);
};

io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado:", socket.id);

  socket.emit("messages", await getNormalizedMessages());

  socket.on("newProduct", async (product) => {
    await productContainer.save(product);
    io.sockets.emit("products", productContainer);
  });

  socket.on("newMessage", async (message) => {
    await messagesContainer.save({
      ...message,
    });
    const normalized = await getNormalizedMessages();
    io.sockets.emit("messages", normalized);
  });
});

const routerEjs = express.Router();

routerEjs.get("/productos", async (req, res) => {
  const listaProductos = getProductosFaker();
  res.render(`${__dirname}/views/ejs/listaProductos.ejs`, { listaProductos });
});

app.use("/", routerEjs);
