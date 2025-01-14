const { Pool } = require('pg');
const { InternalError, NotFoundError } = require('../exceptions');
const GenerateId = require('../generator');
// Made by mdavap

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${GenerateId()}`;

    const target = {
      id,
      title,
      year,
      genre,
      performer,
    };

    if (duration) target.duration = duration;
    if (albumId) target.albumid = albumId;

    const keys = Object.keys(target);
    const totalValues = [];

    for (let i = 0; i < keys.length; i += 1) {
      totalValues.push(`$${i + 1}`);
    }

    const query = {
      text: `
            INSERT INTO songs (${keys.join(', ')})
            VALUES (${totalValues.join(', ')})
            RETURNING id
            `,
      values: Object.values(target),
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalError('Failed to add new song');
    }

    return result.rows[0].id;
  }

  async updateSong(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const target = {
      title,
      year,
      genre,
      performer,
    };

    if (duration) target.duration = duration;
    if (albumId) target.albumId = albumId;

    const keys = Object.keys(target);
    const totalKeys = [];
    for (let i = 0; i < keys.length; i += 1) {
      totalKeys.push(`${keys[i]} = $${i + 1}`);
    }

    target.id = id;

    const query = {
      text: `
            UPDATE songs SET ${totalKeys.join(', ')} WHERE id = $${totalKeys.length + 1} RETURNING *
            `,
      values: Object.values(target),
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Failed to update song. Id doesnt exist');
    }

    return result.rows;
  }

  async deleteSong(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete song. Id doesnt exist');
    }
  }

  async getSong(id = undefined) {
    if (id) {
      const query = {
        text: 'SELECT * FROM songs WHERE id = $1',
        values: [id],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
        throw new NotFoundError('Song id doesnt exist');
      }

      return result.rows[0];
    }

    const result = await this._pool.query('SELECT id, title, performer FROM songs');
    return result.rows;
  }

  async findSong({ title, performer }) {
    let query;

    if (title && performer) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
    } else if (title) {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1',
        values: [`%${title}%`],
      };
    } else {
      query = {
        text: 'SELECT id, title, performer FROM songs WHERE performer ILIKE $1',
        values: [`%${performer}%`],
      };
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Search result is not found');
    }

    return result.rows;
  }
}

module.exports = SongService;
