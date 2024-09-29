import nodemailer from "nodemailer";
import config from "../config/email.js";

const sendToEmail = async (document) => {
  const transporter = nodemailer.createTransport(config);

  const mailContent = {
    from: "notesApp <deddiaPermana>",
    to: document.to,
    subject: document.subject,
    text: document.text,
  };

  transporter.verify(function (error, success) {
    if (error) {
      console.error(error);
      throw new Error("email server is not ready");
    }
    console.log("Server is ready to take our messages");
  });

  try {
    await transporter.sendMail(mailContent);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

export default sendToEmail;
