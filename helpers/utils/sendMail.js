const wrapper = require("./wrapper");
const { SUCCESS, ERROR } = require("../http-status/status_code");
const nodemailer = require("nodemailer");
const config = require("../../infra/config/global_config");

const sendmail = async (recipients, subjectMail, contentMail) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.get("/email"),
        pass: config.get("/pass"),
      },
    });

    const mailOptions = {
      from: "<swaggerdev.info@gmail.com>",
      replyTo: "noreply.swaggerdev.info@gmail.com",
      to: recipients,
      subject: subjectMail,
      html: contentMail,
    };

    const result = await transporter.sendMail(mailOptions);

    return wrapper.data(null, "success", SUCCESS.OK);
  } catch (error) {
    return wrapper.error("fail", error.message, ERROR.INTERNAL_ERROR);
  }
};

module.exports = { sendmail };
