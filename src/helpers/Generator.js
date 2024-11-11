class Generator {
  static generatePassword = () => {
    return "Test@1234";
  };
  static generateOTP = () => {
    return "12345678";
  };

  static generateUserID = () => {
    return `${Generator.randomNumber(4)}${Generator.randomNumber(
      4
    )}${Generator.randomNumber(4)}${Generator.randomNumber(4)}`;
  };
  static randomNumber = (len) => {
    const multiplier = Math.pow(10, len - 1);
    return Math.floor(Math.random() * 9 * multiplier + multiplier);
  };
}

module.exports = Generator;
