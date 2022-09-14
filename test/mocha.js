const supertest = require("supertest");
const chai = require("chai");
const request = supertest("http://localhost:8080/api/productos");
const expect = chai.expect;

describe("test productos", () => {
  describe("productos", () => {
    it("Debe devolver status 200", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });

    it("Debe devolver un array", async () => {
      const response = await request.get("/");
      expect(response.body).to.be.an("array");
    });
  });

  describe("crear producto", async () => {
    it("Debe devolver status 200", async () => {
      const response = await request.post("/").send({
        title: "Lapiz",
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        price: 154,
      });
      expect(response.status).to.eql(200);
      expect(response.body).include.keys("title", "thumbnail", "price");
      expect(response.body.title).to.eql("Lapiz");

      expect(response.body.thumbnail).to.eql(
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
      );
      expect(response.body.price).to.eql(154);
    });
  });

  describe("actualizar producto", async () => {
    it("Debe devolver status 200 y modificar el producto", async () => {
      const {
        body: { _id: id },
      } = await request.post("/").send({
        title: "Lapiz",
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        price: 154,
      });
      const response = await request.put(`/${id}`).send({
        price: 600,
      });

      expect(response.status).to.eql(200);
      expect(response.body.price).to.eql(600);
    });
  });

  describe("borrar producto", async () => {
    it("Debe devolver un status 200 y borrar un producto", async () => {
      const {
        body: { _id: id },
      } = await request.post("/").send({
        title: "Lapiz",
        thumbnail:
          "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        price: 154,
      });
      const response = await request.delete(`/${id}`).send();

      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql("producto borrado");
    });
  });
});
