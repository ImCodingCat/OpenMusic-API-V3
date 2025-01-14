/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('playlists', {
        id: {
            type: 'text',
            primaryKey: true
        },
        name: {
            type: 'text',
            notNull: true
        },
        owner: {
            type: 'text',
            notNull: true,
            references: '"users"',
        },
    });

    pgm.createIndex('playlists', 'owner');
};

exports.down = (pgm) => {};
