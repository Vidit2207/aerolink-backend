const { Mail } = require("../../config");

class AccountDeletionMail {
  to = null;
  subject = null;
  content = null;

  setTo(to) {
    this.to = to;
    return this;
  }
  setSubject() {
    this.subject = "AeroLink account deletion notification";
    return this;
  }
  setContent({ user_id }) {
    this.content = `Your AeroLink account with User ID-${user_id} has been deleted. You cannot access the account any more.`;
    return this;
  }

  build() {
    return new Mail({
      to: this.to,
      subject: this.subject,
      content: this.content,
    });
  }
}
class AccountCreationMail {
  to = null;
  subject = null;
  content = null;

  setTo(to) {
    this.to = to;
    return this;
  }
  setSubject() {
    this.subject = "AeroLink account creation verification";
    return this;
  }
  setContent({ user_id, password }) {
    this.content = `A new AeroLink account has been made with your email. Given below is the details of your account.\nUser ID: ${user_id}\nPassword: ${password}`;
    return this;
  }

  build() {
    return new Mail({
      to: this.to,
      subject: this.subject,
      content: this.content,
    });
  }
}
class NewPasswordMail {
  to = null;
  subject = null;
  content = null;

  setTo(to) {
    this.to = to;
    return this;
  }
  setSubject() {
    this.subject = "New Password for AeroLink account";
    return this;
  }
  setContent(password) {
    this.content = `Given below is the New Password of your account.\Password: ${password}`;
    return this;
  }

  build() {
    return new Mail({
      to: this.to,
      subject: this.subject,
      content: this.content,
    });
  }
}
class NewOtpMail {
  to = null;
  subject = null;
  content = null;

  setTo(to) {
    this.to = to;
    return this;
  }
  setSubject() {
    this.subject = "OTP for AeroLink account";
    return this;
  }
  setContent(otp) {
    this.content = `Given below is the OTP of your account.\nOTP: ${otp}`;
    return this;
  }

  build() {
    return new Mail({
      to: this.to,
      subject: this.subject,
      content: this.content,
    });
  }
}

module.exports = {
  AccountCreationMail,
  NewPasswordMail,
  NewOtpMail,
  AccountDeletionMail,
};
