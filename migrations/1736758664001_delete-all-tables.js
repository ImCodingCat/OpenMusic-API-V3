/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('user_album_likes');
    pgm.dropTable('playlists_songs');
    pgm.dropTable('playlist_song_activities');
    pgm.dropTable('collaborations');
    pgm.dropTable('tokens');
    pgm.dropTable('playlists');
    pgm.dropTable('songs');
    pgm.dropTable('albums');
    pgm.dropTable('users');
};
// truncate playlists_songs, playlist_song_activities, collaborations, tokens, playlists, songs, albums, user_album_likes, users