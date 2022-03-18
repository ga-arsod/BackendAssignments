const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "3175b420c6ad8d", // generated ethereal user
    pass: "937fbd29ab568d", // generated ethereal password
  },
});