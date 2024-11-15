class BaseResponse {
  res = null;
  code = null;
  message = null;
  data = null;
  attributes = {};

  setResObject(res) {
    this.res = res;
    return this;
  }
  setStatusCode(code) {
    this.code = code;
    return this;
  }
  setMessage(message) {
    this.message = message;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  setAttribute(key, data) {
    this.attributes[key] = data;
    return this;
  }
  send() {
    console.log("==========================================");
    this.res.status(this.code).send({
      code: this.code,
      status: this.code >= 200 && this.code < 300,
      message: this.message,
      data: this.data,
      ...this.attributes,
    });
  }
}

module.exports = BaseResponse;
