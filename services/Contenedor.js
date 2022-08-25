const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class ContenedorMongo {
  constructor(collectionName, docSchema) {
    this.collection = mongoose.model(collectionName, docSchema);
  }

  async getAll() {
    try {
      const records = await this.collection.find({});
      return records;
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    const record = await this.collection.findOne({ _id: id });
    return record;
  }

  async getByAttribute(attribute, value) {
    const record = await this.collection.findOne({ [attribute]: value });
    return record;
  }

  async save(record) {
    try {
      const newRecord = await this.collection.create(record);
      return newRecord;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async editById(id, newValues) {
    try {
      await this.collection.updateOne({ _id: id }, newValues);
      return newValues;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const result = await this.collection.deleteOne({ _id: id });

      return !!result.deletedCount;
    } catch (error) {
      throw new Error(`Error al borrar Id ${id}: ${error}`);
    }
  }
}

module.exports = ContenedorMongo;
