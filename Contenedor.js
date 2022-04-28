const {promises: fs} = require('fs');

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName
  }

  async getAll() {
      try {
          const records = await fs.readFile(this.fileName, 'utf-8');
          return JSON.parse(records);
      } catch (error) {
          return []
      }
  }

  async getRandom() {
      const records = await this.getAll();
      return records[Math.floor(Math.random() * records.length)];
  }
}
module.exports = Contenedor
