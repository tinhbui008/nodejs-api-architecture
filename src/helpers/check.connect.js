"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECONDS = 50000;



//Count Connection
const countCounnect = () => {
  const countConnection = mongoose.connections.length;
  console.log(`Numbers connections: ${countConnection}`);
};

//Check Overload
const checkOverload = () => {
  setInterval(() => {
    const numbersConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 4;

    console.log(`Active Connections:: ${numbersConnection}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);

    if (numbersConnection > maxConnections) {
      console.log(`Connections Overload!!!`);
    }
  }, _SECONDS); //
};

module.exports = {
  countCounnect,
  checkOverload,
};
