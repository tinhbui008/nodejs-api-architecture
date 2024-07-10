"use strict";

const exress = require('express');
const { route } = require('./access');
const router = exress.Router();


router.use('/v1/api', require('./access'))

// router.get('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'WELCOME HOME',
//   });
// });

module.exports = router;
