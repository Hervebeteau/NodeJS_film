'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    create(film) {

        const { Film } = this.server.models();

        return Film.query().insertAndFetch(film);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    update(film) {
        const { Film } = this.server.models();

        return Film.query().findById(film.id).patch({
            title: film.title,
            description: film.description,
            releaseDate: film.releaseDate,
            director: film.director,
            type: film.type,
            duration: film.duration
        });
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getFilms() {
        const { Film } = this.server.models();

        // requête d'objection pour récup tous les films
        return Film.query();
    }
};
