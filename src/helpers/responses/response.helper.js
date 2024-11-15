const { HTTP_STATUS } = require("../../data");
const BaseResponse = require("./BASE.response");

class ResponseEntity {
  static Custom = class extends BaseResponse {
    constructor(res) {
      super();
      this.setResObject(res);
    }
  };
  static Ok = class extends BaseResponse {
    constructor(res) {
      super();
      this.setResObject(res).setStatusCode(HTTP_STATUS.OK);
    }
  };
  static Created = class extends BaseResponse {
    constructor(res) {
      super();
      this.setResObject(res).setStatusCode(HTTP_STATUS.CREATED);
    }
  };
  static Accepted = class extends BaseResponse {
    constructor(res) {
      super();
      this.setResObject(res).setStatusCode(HTTP_STATUS.ACCEPTED);
    }
  };
  static NoContent = class extends BaseResponse {
    constructor(res) {
      super();
      this.setResObject(res).setStatusCode(HTTP_STATUS.NO_CONTENT);
    }
  };
}

module.exports = ResponseEntity;
