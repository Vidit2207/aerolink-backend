const express = require("express");
// const { isUser } = require("../middlewares/auth.middlewares");
const { AccountController } = require("../controllers");
const { isUser } = require("../middlewares/auth.middlewares");

// TODO: Parent Class with router and getRouter

class AccountRouter {
  router = express.Router();

  configure = () => {
    this.router.get("/test", (req, res) => {
      res.send("This Router is working");
    });
    // Done: Create New Account - POST - /
    this.router.post("/", AccountController.createNewAccount);
    // Done: Update Account - PUT - /
    this.router.put("/", AccountController.updateExistingAccount);
    // Done: Delete Single Account - DELETE - /
    this.router.delete("/", AccountController.deleteSingleAccount);
    // Done: Read Single Account - GET - /
    this.router.get("/", AccountController.readSingleAccount);
    // DROPPED: Read Multiple Accounts - GET - /multiple
    this.router.get("/multiple", AccountController.readMultipleAccounts);
    // Done: Generate OTP - PUT - /otp
    this.router.get("/otp", AccountController.generateOTPForAccount);
    // Done: Verify OTP - GET - /otp
    this.router.put("/otp", AccountController.verifyOTPForAccount);
    // Done: Change Password - PUT - /password
    this.router.put("/password", AccountController.changeAccountPassword);
    // Done:Forgot Password - GET - /password
    this.router.get("/password", AccountController.resetAccountPassword);
    // Done: Login - POST - /login
    this.router.post("/login", AccountController.logInToAccount);
    // Pending: Logout from single account on single device - PUT - /logout
    this.router.put(
      "/logout",
      isUser,
      AccountController.logoutFromSingleAccount
    );

    // Pending: Test the Validity of JWT (for other projects) - GET - /auth/jwt
    // this.router.put("/auth/jwt", isUser, AccountController.validateJWT);
    // Pending: Change the credits on an account - PUT - /credit
    // this.router.put("/credit", isUser, AccountController.changeAccountCredits);
    // Dropped: Logout from multiple accounts on single device - PUT - /logout/all
    // Dropped: Logout from single account on multiple devices - PUT - /logout/multiple
    // Dropped: Delete Multiple Accounts - DELETE - /multiple

    return this;
  };

  getRouter = () => {
    return this.router;
  };
}

module.exports = AccountRouter;
