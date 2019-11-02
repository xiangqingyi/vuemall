
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const config = require('./mail.config');

const SmtpTransport = nodemailer.createTransport(smtpTransport({
    sverice: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

const sendMail = (recipient, subject, html) => {
    return new Promise((resolve, reject) => {
        SmtpTransport.sendMail({
            from: config.email.user,
            to: recipient,
            subject: subject,
            html: html
        }, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info);
            }
        })
    })
}
module.exports = sendMail;