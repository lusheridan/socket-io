const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  mongoDB: {
    URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hugyzbs.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
