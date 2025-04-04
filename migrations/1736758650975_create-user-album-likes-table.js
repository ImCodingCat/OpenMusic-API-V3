/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('user_album_likes', {
        id: {
            type: 'text',
            primaryKey: true
        },
        user_id: {
            type: 'text',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade'
        },
        album_id: {
            type: 'text',
            notNull: true,
            references: '"albums"',
            onDelete: 'cascade'
        }
    });

    pgm.createIndex('user_album_likes', ['user_id', 'album_id']);

};

exports.down = (pgm) => {};
