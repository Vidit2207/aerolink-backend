// For any malfunction just throw an error
// the error will be paased to the next middleware in the chain
// but instead of the immediate next middleware it will go to the error handling middleware (with 4 parameters)
// thus all errors are handled

const { Account } = require("../patterns/builders");

const createNewAccount = async (req, res, next) => {
  try {
    const { email } = req.body;
    const account = new Account();
    account
      .setEmail(email)
      .addNewAuthToken()
      .generatePassword()
      .generateUserID();
    const password = account.password;
    await account.hashPassword();
    await account.create();

    //TODO: Send Email

    res.send({
      status: true,
      message: "Account Created Successfully",
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("createNewAccount threw an error");
    next(error);
  }
};
const updateExistingAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    // const { first_name, middle_name, last_name, phone } = req.body;
    const account = new Account();
    await account.read(query);
    account.setAccountData(req.body);

    // if (first_name) {
    //   account.setFirstName(first_name);
    // }
    // if (middle_name) {
    //   account.setMiddleName(middle_name);
    // }
    // if (last_name) {
    //   account.setLastName(last_name);
    // }
    // if (phone) {
    //   account.setPhone(phone);
    // }

    await account.update();

    //TODO: Send Email

    res.send({
      status: true,
      message: "Account Updated Successfully",
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("updateExistingAccount threw an error");
    next(error);
  }
};

const readSingleAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    const account = new Account();
    await account.read(query);

    //TODO: Send Email

    res.send({
      status: true,
      message: "Account Found Successfully",
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("readSingleAccount threw an error");
    next(error);
  }
};

const deleteSingleAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    const account = new Account();
    await account.delete(query);

    //TODO: Send Email

    res.send({
      status: true,
      message: "Account Deleted Successfully",
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("deleteSingleAccount threw an error");
    next(error);
  }
};

const readMultipleAccounts = async (req, res, next) => {
  try {
    // const { query } = req.query;
    const accountArray = await Account.readMultiple();
    // await account.read(query);

    //TODO: Send Email

    res.send({
      status: true,
      message: accountArray.length + " Accounts Found",
      data: accountArray,
    });
  } catch (error) {
    console.log("readMultipleAccounts threw an error");
    next(error);
  }
};

const generateOTPForAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    const account = new Account();
    await account.read(query);
    account.generateOTP();
    await account.update();

    //TODO: Send Email

    res.send({
      status: true,
      message: "OTP is sent to your registered email",
      // data: account,
    });
  } catch (error) {
    console.log("generateOTPForAccount threw an error");
    next(error);
  }
};
const verifyOTPForAccount = async (req, res, next) => {
  try {
    const { query } = req.query;
    const { otp } = req.body;
    const account = new Account();
    await account.read(query);

    if (otp !== account.otp) {
      return res.status(200).send({ status: false, message: "Invalid OTP" });
    }

    account.setOTP("");
    await account.update();

    res.send({
      status: true,
      message: "OTP Verified",
      // data: account,
    });
  } catch (error) {
    console.log("generateOTPForAccount threw an error");
    next(error);
  }
};

const logInToAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const account = new Account();
    await account.read(email);
    if (!(await account.isValidPassword(password))) {
      return res
        .status(400)
        .send({ status: false, message: "Incorrect Credentials" });
    }

    account.addNewAuthToken();
    const token = account.tokens[account.tokens.length - 1].token;
    await account.update();

    //TODO: Send Email

    res.send({
      status: true,
      message: "Logged In Successfully",
      authToken: token,
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("logInToAccount threw an error");
    next(error);
  }
};
const logoutFromSingleAccount = async (req, res, next) => {
  try {
    const { email } = req;
    const account = new Account();
    await account.read(email);
    const tokens = account.tokens.filter(
      (element) => element.token !== req.headers.authorization
    );
    account.setTokens(tokens);
    await account.update();

    //TODO: Send Email

    res.send({
      status: true,
      message: "Logged Out Successfully",
      data: account.getPublicData(),
    });
  } catch (error) {
    console.log("logoutFromSingleAccount threw an error");
    next(error);
  }
};

// const logoutFromAllAccounts = async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     const account = new Account();
//     await account.read(query);
//     account.generateOTP();
//     await account.update();

//     //TODO: Send Email

//     res.send({
//       status: true,
//       message: "OTP is sent to your registered email",
//       data: account,
//     });
//   } catch (error) {
//     console.log("generateOTPForAccount threw an error");
//     next(error);
//   }
// };
// const logoutFromSingleAccountMultipleDevices = async (req, res, next) => {
//   try {
//     const { query } = req.query;
//     const account = new Account();
//     await account.read(query);
//     account.generateOTP();
//     await account.update();

//     //TODO: Send Email

//     res.send({
//       status: true,
//       message: "OTP is sent to your registered email",
//       data: account,
//     });
//   } catch (error) {
//     console.log("generateOTPForAccount threw an error");
//     next(error);
//   }
// };

const changeAccountPassword = async (req, res, next) => {
  try {
    const { query } = req.query;
    const { password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return res
        .status(400)
        .send({ status: false, message: "Passwords do not match" });
    }
    const account = new Account();
    await account.read(query);
    account.setPassword(password);
    await account.hashPassword();

    await account.update();

    //TODO: Send Email

    res.send({
      status: true,
      message: "Password Changed Successfully",
      // data: account,
    });
  } catch (error) {
    console.log("changeAccountPassword threw an error");
    next(error);
  }
};
const resetAccountPassword = async (req, res, next) => {
  try {
    const { query } = req.query;

    const account = new Account();
    await account.read(query);
    account.generatePassword();
    const password = account.password;
    await account.hashPassword();

    await account.update();

    //TODO: Send Email with password

    res.send({
      status: true,
      message: "Password Reset Successfully. Check Email.",
      // data: account,
    });
  } catch (error) {
    console.log("resetAccountPassword threw an error");
    next(error);
  }
};
const changeAccountCredits = async (req, res, next) => {
  try {
    const { query } = req.query;
    const { credit } = req.body;

    const account = new Account();
    await account.read(query);
    account.setCredit(credit);

    await account.update();

    //TODO: Send Email with password

    res.send({
      status: true,
      message: "Account credited",
      data: account,
    });
  } catch (error) {
    console.log("changeAccountCredits threw an error");
    next(error);
  }
};
module.exports = {
  createNewAccount,
  updateExistingAccount,
  deleteSingleAccount,
  readSingleAccount,
  readMultipleAccounts,
  generateOTPForAccount,
  verifyOTPForAccount,
  logInToAccount,
  logoutFromSingleAccount,
  changeAccountPassword,
  resetAccountPassword,
  changeAccountCredits,
};
