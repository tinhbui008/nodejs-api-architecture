"use strict";

const StatusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const ReasonStatusCode = {
  FORBIDDEN: "Bad Request Error",
  CONFLICT: "Conflict Error",
};


const {StatusCodes, ReasonPhrases} = require('../auth/httpStatusCode')

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(
    message = StatusCodes.CONFLICT,
    statusCode = ReasonPhrases.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = StatusCodes.FORBIDDEN,
    statusCode = ReasonPhrases.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = StatusCodes.FORBIDDEN,
    statusCode = ReasonPhrases.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}

module.exports = { ConflictRequestError, BadRequestError, AuthFailureError };