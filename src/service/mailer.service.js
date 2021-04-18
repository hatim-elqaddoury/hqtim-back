var nodemailer = require('nodemailer');
const {
    template,
    template2,
    templateSimple
} = require('../utils/mailer/mail.template');

var transporter = nodemailer.createTransport({
    host: 'hqtim.com',
    port: 465,
    secure: true,
    auth: {
        user: 'auth@hqtim.com',
        pass: 'GpL-&Uj%2z%siZnC=e'
    }
});


var sendMailTo = (to, subject, content, username) => {

    var mailOptions = {
        from: 'HQtim.com <contact@hqtim.com>',
        to: to,
        subject: subject,
        html: template(username || "User", content),
        attachments: [
            // {
            //     filename: 'text1.txt',
            //     content: 'hello world!'
            // },
            // {   // binary buffer as an attachment
            //     filename: 'text2.txt',
            //     content: new Buffer.from('hello world!','utf-8')
            // },
            // {   // file on disk as an attachment
            //     filename: 'alf lila',
            //     path: './uploads/10001-night.zip' // stream this file
            // },
            // {   // filename and content type is derived from path
            //     path: 'http://192.168.1.29:3000/api/file/1612826679720.mp3' 
            // },
            // {   // define custom content type for the attachment
            //     filename: 'text.bin',
            //     content: 'hello world!',
            //     contentType: 'text/plain'
            // },
            // {   // use URL as an attachment
            //     filename: 'license.txt',
            //     path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
            // },
            // {   // encoded string as an attachment
            //     filename: 'text1.txt',
            //     content: 'aGVsbG8gd29ybGQh',
            //     encoding: 'base64'
            // },
            // {   // data uri as an attachment
            //     path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
            // }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info, next) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

var sendMailFrom = (from, subject, content, firstName, lastName, phone) => {
    
    var mailOptions = {
        from: 
        
        ((firstName) ? firstName+' ' : '' + (lastName) ? ' '+lastName+' ' : '' || 'Automatic sender') + ' from HQtim.com <infos@hqtim.com> ',
        to: 'HQtim.com <contact@hqtim.com>',
        subject: subject, /** "[ "+ (username || "unkown") + " <"+from+" ] - " +  **/
        html: templateSimple(content + 
            "<br><br><h1>" + ((firstName) ? firstName : '') + ((lastName)? ' '+lastName: '') + "</h1>" +
            ((from) ? ("<br> " + from) : '') +
            ((phone) ? ("<br>Tel.: " + phone) : '')
        ),
        attachments: [
            // {   // filename and content type is derived from path
            //     path: 'http://192.168.1.29:3000/api/file/1612826679720.mp3' 
            // },
        ]
    };

    transporter.sendMail(mailOptions, function (error, info, next) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




module.exports = {
    sendMailTo, sendMailFrom
}