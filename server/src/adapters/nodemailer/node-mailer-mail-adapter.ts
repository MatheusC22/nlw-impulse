import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "82a81b872ebf5b",
        pass: "0c30348499ae3e"
    }
});

export class NodemailerMailAdapapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'spare <contaspare666@gamil.com>',
        subject,
        html: body,
    });
    };
}
