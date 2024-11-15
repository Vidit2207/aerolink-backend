const { HTTP_STATUS } = require("../../data");
const BaseError = require("./BASE.error");

class ClientError {
  static type = "ClientRequestError";
  static BadRequest = class extends BaseError {
    constructor(message) {
      super({ code: HTTP_STATUS.BAD_REQUEST, message, type: ClientError.type });
      this.name = "BadRequestError";
    }
  };
  static Unauthorized = class extends BaseError {
    constructor(message) {
      super({
        code: HTTP_STATUS.UNAUTHORIZED,
        message,
        type: ClientError.type,
      });
      this.name = "UnauthorizedError";
    }
  };
  static Forbidden = class extends BaseError {
    constructor(message) {
      super({ code: HTTP_STATUS.FORBIDDEN, message, type: ClientError.type });
      this.name = "ForbiddenError";
    }
  };
  static NotFound = class extends BaseError {
    constructor(message) {
      super({ code: HTTP_STATUS.NOT_FOUND, message, type: ClientError.type });
      this.name = "NotFoundError";
    }
  };
  static MethodNotAllowed = class extends BaseError {
    constructor(message) {
      super({
        code: HTTP_STATUS.METHOD_NOT_ALLOWED,
        message,
        type: ClientError.type,
      });
      this.name = "MethodNotAllowedError";
    }
  };
  static Conflict = class extends BaseError {
    constructor(message) {
      super({ code: HTTP_STATUS.CONFLICT, message, type: ClientError.type });
      this.name = "ConflictError";
    }
  };
}
module.exports = ClientError;
