const MailerService = require("../service/mailer.service");

let mailerS;

module.exports = class MailerController {
    constructor() {
        mailerS = new MailerService();
    }

    sendEmailTo(req, res) {

        let body = req.body;

        if (body.to && body.subject && body.content) {
            mailerS.sendMailTo(body.to, body.username, body.subject, body.content, body.attachments)
                .then(
                    (infos) => {
                        res.status(200).send("Sent to " + body.to);
                        console.log('Email sent: ' + infos.response);
                    }
                ).catch(
                    (error) => {
                        res.status(400).send("Something went wrong, please verify your enteries");
                        console.log(error);
                    }
                );

        } else {
            res.status(400).send("Some entry is null or undefined");
        }

    }

    sendEmailFrom(req, res) {

        let body = req.body;

        if (body.from && body.subject && body.content) {
            mailerS.sendMailFrom(body.from, body.subject, body.content, body.attachments, body.firstName, body.lastName, body.phone)
                .then(
                    (infos) => {
                        res.status(200).send("Sent from " + body.from);
                        console.log('Email sent: ' + infos.response);
                    }
                ).catch(
                    (error) => {
                        res.status(400).send("Something went wrong, please verify your enteries");
                        console.log(error);
                    }
                );
        } else {
            res.status(400).send("Some entry is null or undefined");
        }

    }

}