import nodemailer from "nodemailer";

class MailService {
  static async sendEmail(args) {
    const transporter = nodemailer.createTransport("SMTP", {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const { toEmail, subject, content } = args;
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: toEmail,
      subject,
      text: content,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default MailService;
