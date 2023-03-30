'use strict';

module.exports = {

    // eslint-disable-next-line @hapi/hapi/scope-start
    async up(knex) {
        // eslint-disable-next-line @hapi/hapi/scope-start
        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').notNull().primary();
            table.integer('id_user').notNull();
            table.integer('id_film').notNull();

        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};
