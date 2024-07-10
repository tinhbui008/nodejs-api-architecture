"use strict";

const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
  
const Roles = {
  SuperAdmin: 'admin',
  Admin: 'admin',
  Customer: 'admin',
}

class AccessService {
  static signUp = async ({name, email, password}) => {
    try {
        // const existUser = await userModel.findOne({email}).lean()

        // if (existUser) {
        //     return {
        //         code: "yyy",
        //         message: 'Account already exists'
        //       }
        // }

        // const passwordhash = await bcrypt.hash(password, 10)

        // const newUser = await userModel.create({
        //     name, email, password: passwordhash, roles: [Roles.SuperAdmin]
        // })

        // if (newUser) {
        //   const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
        //     modulusLength: 4096
        //   })

        //   console.log({privateKey, publicKey})
        // }

        
        return {
          code: "yyy",
          message: error.message,
          status: "error",
        }
    } catch (error) {
      return {
        code: "abcxyz",
        message: error.message,
        status: "error",
      }
    }
  }
}

module.exports = AccessService;
