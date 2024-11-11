const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

const transporter = nodemailer.createTransport(
  new SMTPTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASS,
    },
  })
);

class Mail {
  from = process.env.GMAIL_EMAIL;
  to = null;
  subject = null;
  content = null;

  constructor({ to, subject, content }) {
    this.to = to;
    this.subject = subject;
    this.content = content;
  }

  sendMailWithText = () => {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.content,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log(info.envelope);
      }
    });
  };
  sendMailWithHtml = () => {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.content,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
        console.log("Email sent: " + info.response);
      }
    });
  };
}

module.exports = Mail;
