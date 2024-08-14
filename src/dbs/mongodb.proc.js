"use strict";
const mongoose = require("mongoose");
const {
  db: { host, name, port, username, password },
} = require("../configs/config.mongodb");
const { checkOverload } = require("../helpers/check.connect");
// const connString = `mongodb://${username}:${password}@${host}:${port}/${name}`;
// const connString = `mongodb://${host}:${port}/${name}`;
const connString = `mongodb://mongo_db:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connString)
      .then((_) => {
        console.log(`Connect Mongodb Success :)))`);
      })
      .catch((err) => console.log(`Err Connect !!! ${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
