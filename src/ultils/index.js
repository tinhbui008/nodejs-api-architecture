"use strict";

const _ = require("lodash");

const getInfoData = ({ fiels = [], object = {} }) => {
  return _.pick(object, fiels);
};

const selectData = (select = []) => {
  return Object.fromEntries(select.map((e) => [e, 1]));
};

const unSelectData = (select = []) => {
  return Object.fromEntries(select.map((e) => [e, 0]));
};

module.exports = {
  getInfoData,
  selectData,
  unSelectData,
};
