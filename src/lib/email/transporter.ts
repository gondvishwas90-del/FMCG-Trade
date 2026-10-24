import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
  },
  tls: {
    // Required for some GoDaddy / custom SMTP servers to prevent ECONNRESET
    rejectUnauthorized: false,
    ciphers: 'SSLv3',
  },
});

export default transporter;
