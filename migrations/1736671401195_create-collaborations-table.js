/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('collaborations', {
        id: {
            type: 'text',
            primaryKey: true
        },
        playlist_id: {
            type: 'text',
            notNull: true,
            references: '"playlists"',
        },
        user_id: {
            type: 'text',
            notNull: true,
            references: '"users"',
        },
    });

    pgm.createIndex('collaborations', ['playlist_id', 'user_id']);

};

exports.down = (pgm) => {};
