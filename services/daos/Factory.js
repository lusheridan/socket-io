const messagesContainer = require("./messages.js");
const productContainer = require("./products.js");

class Factory {
  static get(type) {
    switch (type) {
      case "message":
        return messagesContainer;
      case "product":
        return productContainer;
    }
  }
}

module.exports = Factory;
