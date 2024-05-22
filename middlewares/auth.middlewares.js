const { AccountCollection } = require("../models");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(req.headers);
    if (!token) {
      return res.status(400).send({ status: false, message: "No Token Error" });
    }

    const account = await AccountCollection.findOne({ "tokens.token": token });
    if (!account) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Token Error" });
    }

    req.email = account.email;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isUser };
