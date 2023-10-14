import nodemailer, { Transporter } from "nodemailer";
export class Nodemailer {

  constructor(private transporter: Transporter) {
  }

  async run ({from, to, subject, html, text}:{ from: string, to: string, subject: string, html?: string, text?: string }) {
    return this.transporter.sendMail({
      from,
      to,
      subject,
      html,
      text
    });
  }
}