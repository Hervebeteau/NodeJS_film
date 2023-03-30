'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();
        return User.query().insertAndFetch(user);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getUsers() {
        const { User } = this.server.models();
        return User.query();
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    delete(user) {
        const { User } = this.server.models();
        return User.query().deleteById(user.id);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    update(user) {
        const { User } = this.server.models();
        return User.query().findById(user.id).patch({
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            mail: user.mail,
            username: user.username
        });
    }
    // eslint-disable-next-line @hapi/hapi/scope-start
    setAdmin(user) {
        const { User } = this.server.models();

        return User.query().findById(user.id).patch({
            role: 'admin'
        });
    }
    // eslint-disable-next-line @hapi/hapi/scope-start
    login(user) {
        const { User } = this.server.models();
        return User.query().where('mail', user.mail).limit(1);
    }
    // eslint-disable-next-line @hapi/hapi/scope-start
    getEmails() {
        const { User } = this.server.models();

        // requête d'objection pour récup tous les emails
        return User.query().select('mail');
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getEmailsHavingFilmInFavorite(idFilm) {
        const { User } = this.server.models();
        const { Favorite } = this.server.models();

        return User.query().select('mail').whereIn(
            'id',
            Favorite.query().select('id_user').where('id_film', idFilm)
        );
    }
};
