const socket = io();
const divMessages = document.querySelector("#messages");
const formChat = document.getElementById("formChat");
const formProducts = document.getElementById("formProducts");

formChat.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = document.querySelector("#id").value;
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const edad = document.querySelector("#edad").value;
  const alias = document.querySelector("#alias").value;
  const avatar = document.querySelector("#avatar").value;
  const texto = document.querySelector("#texto").value;
  const message = {
    author: {
      id: id,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
    },
    text: texto,
  };

  socket.emit("newMessage", message);
});

formProducts &&
  formProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;

    socket.emit("newProduct", { title, price, thumbnail });
  });

socket.on("messages", (messages) => {
  const authorSchema = new normalizr.schema.Entity("authors");
  const messageSchema = new normalizr.schema.Entity("messages", {
    author: authorSchema,
  });

  denormalizedMessages = normalizr.denormalize(
    messages.result,
    [messageSchema],
    messages.entities
  );

  const mensajeComprimido = document.getElementById("compresion");
  const denormalizeLength = JSON.stringify(denormalizedMessages).length;
  const messageLength = JSON.stringify(messages).length;

  const compresion = (
    ((denormalizeLength - messageLength) / messageLength) *
    100
  ).toFixed(2);
  mensajeComprimido.innerHTML = `Nivel de Compresión: ${compresion}%`;

  divMessages.innerHTML = denormalizedMessages
    .map(({ author, text }) => {
      return `<div>
      <span style="color:blue"><b>${author.nombre} ${author.apellido} (${author.id})</b></span>
      <span style="color:green"><i>${text}</i></span>
      </div>`;
    })
    .join("");
});

socket.on("products", () => {
  location.reload();
});
