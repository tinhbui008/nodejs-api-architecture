"use strict";

const exress = require("express");
const router = exress.Router();

const { apiKey, permission, xyz } = require("../auth/checkAuth");

router.use(apiKey);
router.use(permission("0001"), (req, res) => {
    console.log('permissionnnnnnnnnn')
});

router.use("/v1/api", require("./access"));

module.exports = router