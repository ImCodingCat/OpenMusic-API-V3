/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('playlist_song_activities', {
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
        user_id: {
            type: 'text',
            notNull: true,
            references: '"users"',
        },
        action: {
            type: 'text',
            notNull: true
        },
        time: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    });

    pgm.createIndex('playlist_song_activities', ['playlist_id', 'song_id', 'user_id']);
};

exports.down = (pgm) => {};
