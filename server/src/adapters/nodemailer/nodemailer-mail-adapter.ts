import {MailAdapter, SendMailData} from '../mail-adapter'
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6df5fa1452c794",
    pass: "33335ab10b3b87"
  }
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Rodrigo Torres <rodrigo.gviva@gmail.com>',
      subject: subject,
      html: body
    })
  }
} 