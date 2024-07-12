"use strict";
const mongoose = require("mongoose");
const {db: {host, name, port}} = require('../configs/config.mongobd')
const { checkOverload } = require("../helpers/check.connect");
// const connString = `mongodb://${host}:${port}/${name}`;
const connString = `mongodb+srv://dev:GGtABYkYI9eq1Eoa@nodejs-cluster.lv98edw.mongodb.net/`;


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
      .catch((err) => console.log(`Err Connect !!!`));
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
