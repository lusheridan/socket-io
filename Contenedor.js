const { promises: fs } = require("fs");

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async save(record) {
    const records = await this.getAll();
    let newId;

    if (records.length > 0) {
      newId = records[records.length - 1].id + 1;
    } else {
      newId = 1;
    }

    const newRecord = { ...record, id: newId };
    records.push(newRecord);

    try {
      await fs.writeFile(this.fileName, JSON.stringify(records, null, 2));
      return newRecord;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async getById(id) {
    const records = await this.getAll();
    const record = records.find((x) => x.id === id);
    return record;
  }

  async getAll() {
    try {
      const records = await fs.readFile(this.fileName, "utf-8");
      return JSON.parse(records);
    } catch (error) {
      return [];
    }
  }

  async editById(id, newValues) {
    const records = await this.getAll();
    const index = records.findIndex((x) => x.id === id);

    if (index >= 0 && index < records.length) {
      records[index] = { ...records[index], ...newValues };

      try {
        await fs.writeFile(this.fileName, JSON.stringify(records, null, 2));
        return records[index];
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
    }
  }

  async deleteById(id) {
    try {
      const records = await this.getAll();
      const index = records.indexOf(records.find((x) => x.id === id));

      if (index === -1) {
        return false;
      }

      records.splice(index, 1);
      await fs.writeFile(this.fileName, JSON.stringify(records, null, 2));

      return true;
    } catch (error) {
      throw new Error(`Error al borrar Id ${id}: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.fileName, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}

module.exports = Contenedor;
