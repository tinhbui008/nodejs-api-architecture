'use strict'

const _ = require('lodash')

const getInfoData =  ({fiels = [], object = {}}) => {
    return _.pick(object, fiels)
}

module.exports = {
    getInfoData
}