const nodemailer = require('nodemailer');
const { smtp } = require('../config');

class EmailService {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: {
        user: smtp.user,
        pass: smtp.password,
      },
    });
  }

  sendEmail(targetEmail, payload) {
    const message = {
      from: smtp.sender,
      to: targetEmail,
      subject: 'Playlist export',
      text: 'Your playlist is in attachment',
      attachments: [
        {
          filename: 'playlist.json',
          content: payload,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = EmailService;
