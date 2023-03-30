'use strict';

const Joi = require('joi')


module.exports = {
    method: 'get',
    path: '/films',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {

        const { filmService } = request.services();

        return await filmService.getFilms();
    }
};
