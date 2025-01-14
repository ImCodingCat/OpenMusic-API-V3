/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('songs', {
        id: {
            type: 'text',
            primaryKey: true
        },
        title: {
            type: 'text',
            notNull: true
        },
        year: {
            type: 'integer',
            notNull: true
        },
        genre: {
            type: 'text',
            notNull: true
        },
        performer: {
            type: 'text',
            notNull: true
        },
        duration: {
            type: 'integer'
        },
        albumid: {
            type: 'text',
            references: '"albums"',
        }
    });

    pgm.createIndex('songs', 'albumid');
};

exports.down = (pgm) => {};
