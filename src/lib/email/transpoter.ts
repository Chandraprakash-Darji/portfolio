import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const env = process.env;

const options: SMTPTransport.Options = {
  host: env.EMAIL_HOST || '',
  port: Number(env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: env.EMAIL_USER || '',
    pass: env.EMAIL_PASS || '',
  },
};

export const mailer = nodemailer.createTransport(options);
