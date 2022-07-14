const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const app = express();
const http = require("http");
const { normalize, schema } = require("normalizr");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const local = require("./passport/local");

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

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use("/", express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hugyzbs.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    }),
    secret: "asdfasdf",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register",
    successRedirect: "/productos",
  })
);

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/productos",
    failureRedirect: "/errorCredentials",
  })
);

app.post("/logoutAction", (req, res) => {
  const userName = req.user.email;
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/logout?userName=${userName}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

const routerEjs = express.Router();

routerEjs.get("/logout", (req, res) => {
  try {
    const userName = req.query.userName;
    res.render(`${__dirname}/views/ejs/logout.ejs`, { userName });
  } catch (err) {
    console.log(err);
  }
});

routerEjs.get("/login", async (req, res) => {
  res.render(`${__dirname}/views/ejs/login.ejs`);
});

routerEjs.get("/register", async (req, res) => {
  res.render(`${__dirname}/views/ejs/register.ejs`);
});

routerEjs.get("/errorCredentials", async (req, res) => {
  res.render(`${__dirname}/views/ejs/errorCredentials.ejs`);
});

routerEjs.get("/errorRegister", async (req, res) => {
  res.render(`${__dirname}/views/ejs/errorRegister.ejs`);
});

routerEjs.get("/productos", isAuth, async (req, res) => {
  const listaProductos = getProductosFaker();
  const userName = req.user.email;
  res.render(`${__dirname}/views/ejs/listaProductos.ejs`, {
    listaProductos,
    userName,
  });
});

app.use("/", routerEjs);
