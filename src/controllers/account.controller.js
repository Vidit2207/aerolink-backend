const {
  AccountCreationMail,
  NewOtpMail,
  NewPasswordMail,
} = require("../helpers/prototypes/email.prototypes");
const { AccountService } = require("../services");

// TODO: Make Response Object
class AccountController {
  // Done
  static createNewAccount = async (req, res, next) => {
    try {
      const { email } = req.body;
      const { account, password } =
        await AccountService.createNewAccountUsingEmail(email);

      const mail = new AccountCreationMail()
        .setTo(email)
        .setSubject()
        .setContent({ user_id: account.user_id, password })
        .build();
      mail.sendMailWithText();

      res.send({
        status: true,
        message: "Account Created Successfully",
        data: account,
      });
    } catch (error) {
      console.log("Error - Account Controller - Create New Account");
      next(error);
    }
  };
  // Done
  static updateExistingAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.updateAccountDataUsingEmail(
        query,
        req.body
      );

      //TODO: Send Email

      res.send({
        status: true,
        message: "Account Updated Successfully",
        data: account,
      });
    } catch (error) {
      console.log("updateExistingAccount threw an error");
      next(error);
    }
  };
  // Done
  static readSingleAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.readAccountUsingEmailOrUserId(query);
      if (!account) {
        return res.send({
          status: true,
          message: "Account Not Found",
        });
      }

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
  // Done
  static deleteSingleAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.deleteAccountUsingEmailOrUserId(
        query
      );

      //TODO: Send Email

      res.send({
        status: true,
        message: "Account Deleted Successfully",
        data: account,
      });
    } catch (error) {
      console.log("deleteSingleAccount threw an error");
      next(error);
    }
  };
  // Dropped
  static readMultipleAccounts = async (req, res, next) => {
    try {
      res.send({
        status: true,
        message: "Not Implemeted",
      });
    } catch (error) {
      console.log("readMultipleAccounts threw an error");
      next(error);
    }
  };
  // Done
  static generateOTPForAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const account = await AccountService.updateOTPUsingEmailOrUserId(query);
      const email = new NewOtpMail()
        .setTo(account.email)
        .setSubject()
        .setContent(account.otp)
        .build();
      email.sendMailWithText();
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
  // Done
  static verifyOTPForAccount = async (req, res, next) => {
    try {
      const { query } = req.query;
      const { otp } = req.body;
      const account = await AccountService.verifyOTPUsingEmailOrUserId(
        query,
        otp
      );
      if (!account) {
        return res.status(200).send({ status: false, message: "Invalid OTP" });
      }

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
  // Done
  static logInToAccount = async (req, res, next) => {
    try {
      console.log("loog");
      const { query, password } = req.body;
      const { account, token } = await AccountService.logIntoAccount(
        query,
        password
      );

      //TODO: Send Email

      res.send({
        status: true,
        message: "Logged In Successfully",
        authToken: token,
        data: account,
      });
    } catch (error) {
      console.log("logInToAccount threw an error");
      next(error);
    }
  };
  // Pending
  static logoutFromSingleAccount = async (req, res, next) => {
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
  // Done
  static changeAccountPassword = async (req, res, next) => {
    try {
      const { query } = req.query;
      const { password, confirm_password } = req.body;
      if (password !== confirm_password) {
        return res
          .status(400)
          .send({ status: false, message: "Passwords do not match" });
      }
      const account = await AccountService.changePassword(query, password);

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
  // Done
  static resetAccountPassword = async (req, res, next) => {
    try {
      const { query } = req.query;

      const { account, password } = await AccountService.resetPassword(query);

      const email = new NewPasswordMail()
        .setTo(account.email)
        .setSubject()
        .setContent(password)
        .build();
      email.sendMailWithText();

      res.send({
        status: true,
        message: "Password Changed Successfully",
        // data: account,
      });
    } catch (error) {
      console.log("resetAccountPassword threw an error");
      next(error);
    }
  };
  // Pending
  static changeAccountCredits = async (req, res, next) => {
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
  // Pending
  static validateJWT = async (req, res, next) => {
    try {
      const { email } = req;

      const account = new Account();
      await account.read(email);

      //TODO: Send Email with password

      res.send({
        status: true,
        message: "Account Verified",
        data: account.getPublicData(),
      });
    } catch (error) {
      console.log("changeAccountCredits threw an error");
      next(error);
    }
  };
}
module.exports = AccountController;
