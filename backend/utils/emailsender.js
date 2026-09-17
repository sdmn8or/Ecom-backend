const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


async function sendVerificationEmail(email,token){
    try {
  const info = await transporter.sendMail({
    from: '"agent03sdmn@gmail.com', 
    to: email, 
    subject: "verify ur email",
    html: "<b>verify ur email <a href='http://localhost:5173/verify/${token}'>click here</a></b>",
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

async function forgotpasswordEmail(email,token){
    try {
  const info = await transporter.sendMail({
    from: '"agent03sdmn@gmail.com', 
    to: email, 
    subject: "change  ur pass",
    html: "<b>reset ur pass <a href='http://localhost:5173/resetpassword/${token}'>click here</a></b>",
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}
}

module.exports = {sendVerificationEmail,forgotpasswordEmail};