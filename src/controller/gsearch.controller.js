const GSearchService = require("../service/gsearch.service");
const MailerService = require("../service/mailer.service");

let gSearchS, mailerS;

module.exports = class GSearchController {

    constructor() {
        gSearchS = new GSearchService();
        mailerS = new MailerService();
    }

    search(req, res) {
        
        var body = req.body;

        if (body.q) {
            gSearchS.search(body.q, body.num || 10)
                .then(
                    (links) => {

                        console.log(links);

                        let attachments = [];

                        let content = "Query = " + body.q + "<br><br>Results:<br>";

                        Array.from(links).map(link => {
                            let fname = link.toLowerCase().substring(link.lastIndexOf('/') + 1);

                            //fname = (fname.endsWith(".pdf")) ? fname : fname + ".pdf",

                            attachments.push({
                                filename: fname,
                                path: link
                            });
                            content += "<br>- " + link;
                        });

                        if (!body.mail) return res.status(200).send(attachments);

                        if (body.mail.to && attachments.length > 0)
                            mailerS.sendMailTo(body.mail.to, "User", "Results found [" + attachments.length + "]", content, (body.mail.attachments) ? attachments : null)
                            .then(
                                (infos) => {
                                    res.status(200).send("Sent to " + body.mail.to);
                                    console.log('Email sent to ' + body.mail.to + ' - (' + infos.response + ')');
                                }
                            ).catch(
                                (error) => {
                                    res.status(400).send("Something went wrong");
                                    console.log(error);
                                }
                            );
                        else
                            res.status(200).send("No results were found for the query : " + body.q);
                    }
                ).catch(
                    (error) => {
                        res.status(400).send("Something went wrong");
                        console.log(error);
                    }
                );
        }

    }
}