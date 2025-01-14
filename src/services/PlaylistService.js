const { Pool } = require('pg');
const { InternalError, NotFoundError, ForbiddenError } = require('../exceptions');
const GenerateId = require('../generator');

// Made by mdavap

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async checkPlaylist(playlistId, userId, excludeOwner = false, senderId = undefined) {
    const query = {
      text: 'SELECT owner FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = (await this._pool.query(query)).rows;

    if (!result.length) {
      throw new NotFoundError('Playlist doesnt exist');
    }

    const { owner } = result[0];

    if (excludeOwner ? owner === userId : owner !== userId) {
      throw new ForbiddenError(excludeOwner ? 'Cannot add collaboration at own playlist' : 'Invalid access');
    }

    if (senderId && senderId !== owner) {
      throw new ForbiddenError('Collaboration is not owned by you');
    }
  }

  async addPlaylist(userId, { name }) {
    const id = `playlist-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InternalError('Failed to create new playlist');
    }

    return result.rows[0].id;
  }

  async addPlaylistSong(playlistId, userId, { songId }) {
    const id = `playlists_songs-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO playlists_songs VALUES($1, $2, $3)',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalError('Failed to add song into playlist');
    }

    await this.addActivity(playlistId, songId, userId, 'add');
  }

  async getPlaylist(userId) {
    const query = {
      text: `
            SELECT playlists.id, playlists.name, users.username
            FROM playlists
            INNER JOIN users ON playlists.owner = users.id
            LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
            WHERE playlists.owner = $1 or collaborations.user_id = $1
            `,
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async getPlaylistSong(playlistId, includeUsername = true) {
    const query = {
      text: `
            SELECT playlists.name, users.username, songs.id, songs.title, songs.performer
            FROM playlists_songs
            INNER JOIN playlists ON playlists_songs.playlist_id = playlists.id
            INNER JOIN songs ON songs.id = playlists_songs.song_id
            INNER JOIN users ON users.id = playlists.owner
            WHERE playlists.id = $1
            `,
      values: [playlistId],
    };

    const result = (await this._pool.query(query)).rows;
    if (!result.length) {
      throw new NotFoundError('User doesnt have any playlist');
    }

    const [firstResult] = result;

    const playlist = {
      id: playlistId,
      name: firstResult.name,
    };

    if (includeUsername) playlist.username = firstResult.username;

    playlist.songs = [];

    result.forEach(({ id, title, performer }) => {
      playlist.songs.push({ id, title, performer });
    });

    return playlist;
  }

  async deletePlaylist(playlistId) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete playlist. Id doesnt exist');
    }
  }

  async deletePlaylistSong(playlistId, userId, { songId }) {
    const query = {
      text: 'DELETE FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete song from playlist. Id doesnt exist');
    }

    await this.addActivity(playlistId, songId, userId, 'delete');
  }

  async addActivity(playlistId, songId, userId, action) {
    const id = `playlist-activity-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, new Date().toISOString()],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InternalError('Failed to create playlist activity');
    }

    return result.rows[0].id;
  }

  async getActivities(playlistId) {
    const query = {
      text: `
            SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
            FROM playlist_song_activities
            INNER JOIN users ON users.id = playlist_song_activities.user_id
            INNER JOIN songs ON songs.id = playlist_song_activities.song_id
            WHERE playlist_song_activities.playlist_id = $1
            ORDER BY playlist_song_activities.time
            `,
      values: [playlistId],
    };

    return (await this._pool.query(query)).rows;
  }
}

module.exports = PlaylistService;
