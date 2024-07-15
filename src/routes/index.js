"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../swagger");

// Use the permission middleware
router.use(apiKey)
router.use(permission('000'));
router.use("/v1/api/product", require("./product"));

router.use("/v1/api", require("./access"));
// router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
