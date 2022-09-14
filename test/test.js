const axios = require("axios");
axios.defaults.baseURL = "http://localhost:8080/api/productos";

let id;

async function Testing() {
  await testGet();
  await testCreate();
  await testUpdate();
  await testRemove();
}

async function testGet() {
  try {
    const res = await axios.get();
    if (Array.isArray(res.data)) {
      console.log("Productos cargados");
    } else {
      console.log("No se logró cargar productos");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

async function testRemove() {
  try {
    const res = await axios.delete(`/${id}`);
    if (res.data.message === "producto borrado") {
      console.log("borrado correctamente!");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

async function testCreate() {
  try {
    const res = await axios.post("/", {
      title: "Lapiz",
      thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      price: 154,
    });

    const { title, price, thumbnail, _id } = res.data;
    if (title && price && thumbnail && _id) {
      id = _id;
      console.log("producto creado!");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

async function testUpdate() {
  try {
    const res = await axios.put(`/${id}`, {
      price: 200,
    });
    const { price } = res.data;
    if (price === 200) {
      console.log("producto actualizado!");
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(`${error}`);
  }
}

Testing();
