const { Generator } = require("../helpers");
const { AccountRepository } = require("../repositories");

class AccountService {
  static createNewAccountUsingEmail = async (email) => {
    try {
      const account = new AccountRepository.Builder()
        .setDefault()
        .setEmail(email)
        .addNewAuthToken()
        .build();
      const password = account.password;

      await account.mustNotExist({ email: email });

      await account.create();
      return { account: account.getPublicData(), password: password };
    } catch (error) {
      console.log("Error - AccountService - createNewAccountUsingEmail");
      throw error;
    }
  };
  static updateAccountDataUsingEmail = async (query, data) => {
    try {
      const existingAccount = new AccountRepository.Builder().build();

      await existingAccount.mustExist({ email: query });

      const account = new AccountRepository.Builder(existingAccount)
        .setAccountData(data)
        .build();
      await account.update({ email: query });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - updateAccountDataUsingEmail");
      throw error;
    }
  };
  static readAccountUsingEmailOrUserId = async (query) => {
    try {
      const account = await new AccountRepository.Builder().build().read({
        $or: [{ email: query }, { user_id: query }],
      });

      return account ? account.getPublicData() : account;
    } catch (error) {
      console.log("Error - AccountService - readAccountUsingEmailOrUserId");
      throw error;
    }
  };
  static deleteAccountUsingEmailOrUserId = async (query) => {
    try {
      const account = await new AccountRepository.Builder().build();

      await account.mustExist({
        $or: [{ email: query }, { user_id: query }],
      });

      await account.delete();

      return account ? account.getPublicData() : account;
    } catch (error) {
      console.log("Error - AccountService - deleteAccountUsingEmailOrUserId");
      throw error;
    }
  };
  static updateOTPUsingEmailOrUserId = async (query) => {
    try {
      const existingAccount = new AccountRepository.Builder().build();

      await existingAccount.mustExist({
        $or: [{ email: query }, { user_id: query }],
      });

      const account = new AccountRepository.Builder(existingAccount)
        .setOTP(Generator.generateOTP())
        .build();
      await account.update({ email: account.email });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - updateOTPUsingEmailOrUserId");
      throw error;
    }
  };
  static verifyOTPUsingEmailOrUserId = async (query, otp) => {
    try {
      const existingAccount = new AccountRepository.Builder().build();

      await existingAccount.mustExist({
        $or: [{ email: query }, { user_id: query }],
      });
      if (otp != existingAccount.otp) {
        return false;
      }
      const account = new AccountRepository.Builder(existingAccount)
        .setOTP(null)
        .build();
      await account.update({ email: account.email });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - verifyOTPUsingEmailOrUserId");
      throw error;
    }
  };

  static logIntoAccount = async (query, password) => {
    try {
      console.log(query);
      const existingAccount = await new AccountRepository.Builder()
        .build()
        .mustExist({
          $or: [{ email: query }, { user_id: query }],
        });
      await existingAccount.verifyPassword(password);

      const account = new AccountRepository.Builder(existingAccount)
        .addNewAuthToken()
        .build();
      await account.update({ email: account.email });
      const token = account.tokens[account.tokens.length - 1].token;
      return { account: account.getPublicData(), token };
    } catch (error) {
      console.log("Error - AccountService - logIntoAccount");
      throw error;
    }
  };

  static changePassword = async (query, password) => {
    try {
      const existingAccount = await new AccountRepository.Builder()
        .build()
        .mustExist({
          $or: [{ email: query }, { user_id: query }],
        });

      const account = new AccountRepository.Builder(existingAccount)
        .setPassword(password)
        .build();
      await account.hashPassword();
      await account.update({ email: account.email });
      return account.getPublicData();
    } catch (error) {
      console.log("Error - AccountService - changePassword");
      throw error;
    }
  };
  static resetPassword = async (query, password) => {
    try {
      const existingAccount = await new AccountRepository.Builder()
        .build()
        .mustExist({
          $or: [{ email: query }, { user_id: query }],
        });

      const password = Generator.generatePassword();
      const account = new AccountRepository.Builder(existingAccount)
        .setPassword(password)
        .build();
      await account.hashPassword();
      await account.update({ email: account.email });
      return { account: account.getPublicData(), password };
    } catch (error) {
      console.log("Error - AccountService - resetPassword");
      throw error;
    }
  };
}

module.exports = AccountService;
