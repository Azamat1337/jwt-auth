const nodemailer = require("nodemailer");

class MailService {
    constructor() {
    }

    async init() {
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            }

        });
        return this;
    }

    async sendActivationMail(to, link) {
        const mailOptions = {
            from: '"Example Service" <no-reply@example.com>',
            to: to,
            subject: "Account Activation",
            text: `Please activate your account by clicking the link: ${link}`,
            html: `<p>Please activate your account by clicking <a href="${link}">here</a></p>`
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}

module.exports = new MailService();
