'use strict';

const { Service } = require('@hapipal/schmervice');

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const nodemailer = require('nodemailer');

// eslint-disable-next-line func-style,@hapi/hapi/scope-start
function mailList(mails) {
    let listMails = '';
    // eslint-disable-next-line @hapi/hapi/for-loop
    for (let i = 0; i <= mails.length - 1; i++) {
        if (i === mails.length - 1) {
            listMails += mails[i].mail;
        }
        else {
            listMails += mails[i].mail + ', ';
        }
    }

    return listMails;
}

module.exports = class MailService extends Service {

    async createUserMail(user) {
        const info = await transporter.sendMail({
            from: '"Herve Beteau" <noreply@node.com>', // sender address
            to: user.mail, // list of receivers
            subject: 'Confirmation de création d\'un compte - Projet Node | MF', // Subject line
            text: 'Félicitation ' + user.firstName + ' !\r\n Vous avez bien créé un compte sur le site : Projet Node | MF \r\n Toute l\'équipe vous souhaite la bienvenue, vous pouvez désormais parcourir notre bibliothèque de films et ajouter dés aujourd\'hui des films en favori !', // plain text body
            html: '<p>Félicitation <b>' + user.firstName + '</b> !</p> Vous avez bien créé un compte sur le site : Projet Node | MF<p>Toute l\'équipe vous souhaite la bienvenue, vous pouvez désormais parcourir notre bibliothèque de films et ajouter dés aujourd\'hui des films en favori !</p>' // html body
        });
        const accountTest = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: accountTest.user,
                pass: accountTest.pass
            }
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }


    async createFilmMail(film, mails) {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const listMails = mailList(mails);
        const info = await transporter.sendMail({
            from: '"Herve Beteau" <noreply@projetnode.com>',
            to: listMails,
            subject: 'Un nouveau film a été publié - Projet Node | MF', // Subject line
            text: 'Venez découvrir le nouveau film ' + film.title + ' !\r\n Intéressé ? Alors ajoutez le en favori !', // plain text body
            html: '<p>Venez découvrir le nouveau film <b>' + film.title + '</b> !</p> Intéressé ? Alors ajoutez le en favori !</p>' // html body
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }


    async updateFilmMail(film, mails) {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        const listMails = mailList(mails);
        const info = await transporter.sendMail({
            from: '"Herve Beteau" <noreply@projetnode.com>', // sender address
            to: listMails, // list of receivers
            subject: 'Un film que vous avez en favori a été mis à jour - Projet Node | MF', // Subject line
            text: 'Venez découvrir les nouveautés concernant le film ' + film.title + ' !', // plain text body
            html: '<p>Venez découvrir les nouveautés concernant le film <b>' + film.title + '</b> !' // html body
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};
