const { HTTP_STATUS } = require("../../data");
class BaseError extends Error {
  statusCode = null;
  type = null;
  constructor({ code, message, type }) {
    super(message);
    this.statusCode = code || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    this.type = type || "Server Error";
  }

  getMessage() {
    return this.message;
  }
  getStatusCode() {
    return this.code;
  }
  getType() {
    return this.type;
  }
}

module.exports = BaseError;
