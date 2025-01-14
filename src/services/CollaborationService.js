const { Pool } = require('pg');
const { InternalError, NotFoundError } = require('../exceptions');
const GenerateId = require('../generator');
// Made by mdavap

class CollaborationService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    try {
      const id = `collaboration-${GenerateId()}`;

      const query = {
        text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
        values: [id, playlistId, userId],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new InternalError('Failed to create collaboration');
      }

      return result.rows[0].id;
    } catch (error) {
      throw new NotFoundError('Playlist or Userid doesnt exist');
    }
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete collaboration. Collaboration doesnt exist');
    }
  }

  async checkCollaboration(playlistId, userId) {
    const query = {
      text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    return !result.rows.length;
  }
}

module.exports = CollaborationService;
