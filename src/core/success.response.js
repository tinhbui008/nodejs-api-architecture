const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

const Success = {
  FALSE: "false",
  SUCCESS: "true",
};

class SuccessResponse {
  constructor({
    success = Success.SUCCESS,
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
    this.success = success;
  }

  send(res, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata, success }) {
    super({ message, metadata, success });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
    success,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata, success });
    this.options = options;
  }
}

module.exports = { OK, CREATED, SuccessResponse };
