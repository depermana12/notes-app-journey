import nodemailer from "nodemailer";
import config from "../config/email.js";
import logger from "../config/logger.js";

const transporter = nodemailer.createTransport(config);

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
    throw new Error("Email server is not in the mood");
  }
  logger.info("Email server is good to go");
});

const sendToEmail = async (document) => {
  const mailContent = {
    from: "notesApp <deddiaPermana>",
    to: document.to,
    subject: document.subject,
    text: document.text,
  };

  try {
    await transporter.sendMail(mailContent);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

export default sendToEmail;
