import nodemailer, { type TransportOptions } from "nodemailer";
import { logger } from "../middleware/logger.ts";

const sendEmail = (
  email: string,
  subject: string,
  text: string,
  ...emailConfig: string[]
) => {
  return async (
    email: string,
    subject: string,
    text: string
  ): Promise<boolean> => {
    const [ENV, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS] = emailConfig;
    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      logger.warn("Email configuration not available, skipping email send");
      if (ENV === "production") {
        throw new Error("Something went wrong, please try again later!");
      }
      throw new Error("Email configuration not available");
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    } as TransportOptions);

    try {
      const info = await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject,
        text,
      });
      logger.info(`Email sent: ${info.response}`);
      return true;
    } catch (error) {
      logger.error(`Error sending email: ${error}`);
      throw error;
    }
  };
};
export default sendEmail;
