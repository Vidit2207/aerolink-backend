const { HTTP_STATUS } = require("../../data");
const BaseError = require("./BASE.error");

class ServerError {
  static prefix = "ServerError";

  static InternalServerError = class extends BaseError {
    constructor(message) {
      super(HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
    }
  };
}

module.exports = { ServerError };
