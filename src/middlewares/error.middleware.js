const { ResponseEntity } = require("../helpers");

const handleError = (error, req, res, next) => {
  try {
    console.log(error);

    new ResponseEntity.Custom(res)
      .setStatusCode(error.statusCode || 500)
      .setMessage(error.message || "Internal Server Error")
      .setAttribute("type", error.type)
      .send();
  } catch (err) {
    console.log("Error -> " + err);
  }
};

module.exports = { handleError };
