/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('playlists_songs', {
        id: {
            type: 'text',
            primaryKey: true
        },
        playlist_id: {
            type: 'text',
            notNull: true,
            references: '"playlists"',
            onDelete: 'cascade'
        },
        song_id: {
            type: 'text',
            notNull: true,
            references: '"songs"',
        },
    });

    pgm.createIndex('playlists_songs', ['playlist_id', 'song_id']);
};

exports.down = (pgm) => {};
