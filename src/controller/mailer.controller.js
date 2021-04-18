const { sendMailTo, sendMailFrom } = require("../service/mailer.service");



var sendEmailTo = (req, res) => {

    var body = req.body;

    if (body.to && body.subject && body.content) {
        sendMailTo(body.to, body.subject, body.content, body.username || null);
        res.status(200).send("Sent to " + body.to);
    } else {
        res.status(400).send("Some entry is null or undefined");
    }

}

var sendEmailFrom = (req, res) => {

    var body = req.body;

    if (body.from && body.subject && body.content) {
        sendMailFrom(body.from, body.subject, body.content, body.firstName || null, body.lastName || null, body.phone || null);
        res.status(200).send("Sent");
    } else {
        res.status(400).send("Some entry is null or undefined");
    }

}


module.exports = {
    sendEmailTo, sendEmailFrom
};
