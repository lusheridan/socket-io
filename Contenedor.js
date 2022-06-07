const knex = require("knex");

class Contenedor {
  constructor(options, table) {
    this.knex = knex(options);
    this.table = table;
  }

  async save(record) {
    try {
      const newRecord = await this.knex(this.table).insert(record);
      return newRecord;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getById(id) {
    const getById = await this.knex
      .from(this.table)
      .select("*")
      .where("id", id);
    return getById;
  }

  async getAll() {
    try {
      const getAll = await this.knex.from(this.table).select("*");
      return getAll;
    } catch (error) {
      return [];
    }
  }

  async editById(id, newValues) {
    try {
      const records = await this.knex
        .from(this.table)
        .where("id", id)
        .update(newValues);
      return records;
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedRecord = await this.knex
        .from(this.table)
        .where("id", id)
        .del();
      return deletedRecord;
    } catch (error) {
      throw new Error(`Error al borrar Id ${id}: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const deletedRecords = await this.knex.from(this.table).select("*").del();
      return deletedRecords;
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}

module.exports = Contenedor;
