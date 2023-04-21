const nodemailer = require('nodemailer');

const sendEmailRestorePassword = async (email, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const resetUrl = `${process.env.APP_URL}/resetPassword/${token}`;

  const sendEmail = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Recuperación de contraseña',
    text: `Para recuperar tu contraseña, haz clic en el siguiente enlace: ${resetUrl}`,
    html: `<p>Para recuperar tu contraseña, haz clic en el siguiente enlace: <a href="${resetUrl}">${resetUrl}</a></p>`,
  }, (err, info) => {
    if (err) {
      return err;
    } else {
      return info;
    }
  });
  return sendEmail;
};

module.exports = { sendEmailRestorePassword };
