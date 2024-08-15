require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
var compression = require("compression");
const { countCounnect, checkOverload } = require("./helpers/check.connect");
const bodyParser = require("body-parser");

const app = express();

//mniddlewares
// app.use(morgan('dev'));
// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('dev'));
// app.use(morgan('short'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
require("./dbs/mongodb.proc");

// checkOverload()
app.use("/", require("./routes/index"));

//handle error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
