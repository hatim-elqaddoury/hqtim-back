const nodemailer = require('nodemailer');

const {
    template,
    templateSimple
} = require('../utils/mailer/mail.template');


module.exports = class MailerService {

    constructor() {
        this.transporter = this.createTransport();
    }

    createTransport(){
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'hqtim.com',
            port: process.env.MAIL_PORT || 465,
            secure: true,
            ignoreTLS: true,
            auth: {
                user: process.env.MAIL_USER || 'auth@hqtim.com',
                pass: process.env.PASSWORD || 'GpL-&Uj%2z%siZnC=e'
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: true
            },
            debug: true
        });
    }

    async sendMailTo(to, username, subject, content, attachments) {

        let contentCal = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';


        var mailOptions = {
            from: 'HQtim.com <contact@hqtim.com>',
            to: to,
            subject: subject,
            html: template(username || "User", content),
            attachments: attachments || [],
            calEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: contentCal
            }
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendMailFrom(from, subject, content, attachments, firstName, lastName, phone) {

        var mailOptions = {
            from: ((firstName) ? firstName + ' ' : '' + (lastName) ? ' ' + lastName + ' ' : '' || 'Automatic sender') + ' from HQtim.com <infos@hqtim.com> ',
            to: 'HQtim.com <contact@hqtim.com>',
            subject: subject,
            /** "[ "+ (username || "unkown") + " <"+from+" ] - " +  **/
            html: templateSimple(content +
                "<br><br><h1>" + ((firstName) ? firstName : '') + ((lastName) ? ' ' + lastName : '') + "</h1>" +
                ((from) ? ("<br> " + from) : '') +
                ((phone) ? ("<br>Tel.: " + phone) : '')
            ),
            attachments: attachments || []
        };

        return this.transporter.sendMail(mailOptions);
    }

};