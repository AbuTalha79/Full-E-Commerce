const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")


const sendEmail = asyncHandler(async(data,req,res) => {
    let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  }
});

// async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: '"Fred Foo 👻" <developer@example.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.htm, // html body
  })

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
)

module.exports= sendEmail