const socket = io();

const divMessages = document.querySelector("#messages");

const formChat = document.getElementById("formChat");
const formProducts = document.getElementById("formProducts");

formChat.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputEmail = document.querySelector("#email").value;
  const inputTexto = document.querySelector("#texto").value;
  const message = {
    author: inputEmail,
    text: inputTexto,
  };
  socket.emit("newMessage", message);
});

formProducts.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const thumbnail = document.querySelector("#thumbnail").value;

  socket.emit("newProduct", { title, price, thumbnail });
});

socket.on("messages", (messages) => {
  divMessages.innerHTML = messages
    .map((message) => {
      return `<div>
      <span style="color:blue"><b>${message.author}</b></span>
      <span style="color:brown">[${message.date}]:</span>
      <span style="color:green"><i>${message.text}</i></span>
      </div>`;
    })
    .join("");
});

socket.on("products", () => {
  location.reload();
});
