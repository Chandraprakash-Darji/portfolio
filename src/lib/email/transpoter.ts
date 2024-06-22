import nodemailer from 'nodemailer';

const env = process.env;

export const mailer = nodemailer.createTransport({
  service: 'resend',
  host: env.EMAIL_HOST || '',
  port: env.EMAIL_PORT || '',
  secure: true,
  auth: {
    user: env.EMAIL_USER || '',
    pass: env.EMAIL_PASS || '',
  },
});
