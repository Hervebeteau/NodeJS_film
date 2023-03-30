'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async create(idUser, favorite) {
        const { Favorite } = this.server.models();
        const { Film } = this.server.models();
        favorite.id_user = idUser;
        let isFavorite;
        // eslint-disable-next-line prefer-const
        isFavorite = await Favorite.query()
            .where('id_user', favorite.id_user)
            .where('id_film', favorite.id_film);
        if (isFavorite.length !== 0) {
            throw new Error('Error : This film is already in your favorite list');
        } else {

            // eslint-disable-next-line prefer-const
            let doExist = await Film.query().where('id', favorite.id_film);
            if (doExist.length === 0) {
                throw new Error('Error : This film doesn\'t exist');
            }
        }

        return Favorite.query().insertAndFetch(favorite);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getFavoriteList(userId) {
        const { Film } = this.server.models();
        const { Favorite } = this.server.models();
        return Film.query().whereIn('id', Favorite.query().select('id_film').where('id_user', userId)        );
    }
    // eslint-disable-next-line @hapi/hapi/scope-start
    async delete(userId, filmId) {
        const { Favorite } = this.server.models();
        let isFavorite;
        // eslint-disable-next-line prefer-const
        isFavorite = await Favorite.query().where('id_user', userId).where('id_film', filmId.id_film);
        if (isFavorite.length === 0) {
            throw new Error('Error : This film is not in your favorite film list.');
        }

        return Favorite.query()
            .delete()
            .where('id_user', userId)
            .where('id_film', filmId.id_film);
    }
};
