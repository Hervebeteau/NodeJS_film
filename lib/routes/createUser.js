'use strict';

const Joi = require('joi');
const Encrypt = require('@herveb/iutencrypt');

// requête createUser
module.exports = {
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('User firstname'),
                lastName: Joi.string().required().min(3).example('Doe').description('User lastname'),
                password: Joi.string().required().min(8).example('motdepasse').description('User password'),
                mail: Joi.string().required().min(8).example('herve.beteau@etu.unilim.fr').description('User mail'),
                username: Joi.string().required().example('Johnny').description('Username')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        const { mailService } = request.services();

        // Chiffrement du mdp avant l'envoie en BD
        request.payload.password = Encrypt.sha1(request.payload.password);

        await mailService.createUserMail(request.payload);

        return userService.create(request.payload);
    }
};
