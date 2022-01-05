const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");

const sendEmail = async (name, email, cpf) => {
  const token = jwt.sign({name, email, cpf}, process.env.JWT_ACC_ACTIVATE, { expiresIn: '5m' });

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: 'Account activation Link',
    html: ` 
        <h2>Please click on given link to activate you account</h2>
        <a href=${process.env.CLIENT_URL}/api/authentication/active/${token}>Click here to activate your account</a>
    `})
}

module.exports = { sendEmail }
