const { REGEX } = require("../data");

class Validator {
  static cannotBeEmpty = (value) => {
    if (REGEX.EMPTY_STRING.test(value)) {
      throw new Error("Empty String");
    }
    return value;
  };

  static isValidUserID(id) {
    if (id.length < 16) {
      throw new Error("Invalid User ID");
    }
    return id;
  }
  static isEmail(email) {
    if (!REGEX.EMAIL.test(email)) {
      throw new Error("Invalid Email");
    }
    return email;
  }
}

module.exports = Validator;
