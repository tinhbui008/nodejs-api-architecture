"use strict";

const exress = require('express');
const accessController = require('../../controllers/access.controller')
const router = exress.Router();

router.post('/account/signup', accessController.signUp);

module.exports = router;
