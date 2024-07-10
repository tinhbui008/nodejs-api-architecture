"use strict";

const connString = `mongodb://209.38.26.90:2718/test`;

const mongoose = require("mongoose");

mongoose
  .connect(connString)
  .then((_) => console.log("Connect Success :)))"))
  .catch((err) => console.log(`Err Connect !!!`));

if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
