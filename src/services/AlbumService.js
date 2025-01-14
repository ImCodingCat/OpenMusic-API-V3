const { Pool } = require('pg');
const { InternalError, NotFoundError, ValidationError } = require('../exceptions');
const GenerateId = require('../generator');
// Made by mdavap

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalError('Failed to add new album');
    }

    return result.rows[0].id;
  }

  async addAlbumCover(albumId, fileUrl) {
    const query = {
      text: 'UPDATE albums SET cover_url = $2 WHERE id = $1',
      values: [albumId, fileUrl],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Failed to update album cover. Id doesnt exist');
    }
  }

  async addAlbumLike(userId, albumId) {
    let query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1',
      values: [userId],
    };

    let result = await this._pool.query(query);
    if (result.rows.length) {
      throw new ValidationError('You cant add another like');
    }

    const id = `like-${GenerateId()}`;

    query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3)',
      values: [id, userId, albumId],
    };

    result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalError('Failed to like to album');
    }
  }

  async updateAlbum(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $2, year = $3 WHERE id = $1 RETURNING *',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Failed to update album. Id doesnt exist');
    }

    return result.rows;
  }

  async deleteAlbum(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete album. Id doesnt exist');
    }
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Failed to delete album. User doesnt like any album yet');
    }
  }

  async getAlbumLike(albumId) {
    const query = {
      text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const { rows } = await this._pool.query(query);

    return rows.length ? rows[0].count : 0;
  }

  async getAlbum(id = undefined, includeSong = true) {
    if (id) {
      let query = {
        text: 'SELECT id, name, year, cover_url AS "coverUrl" FROM albums WHERE id = $1',
        values: [id],
      };

      const albums = (await this._pool.query(query)).rows;

      if (!albums.length) {
        throw new NotFoundError('Album id doesnt exist');
      }

      const [album] = albums;

      if (includeSong) {
        query = {
          text: 'SELECT id, title, performer FROM songs WHERE albumid = $1',
          values: [id],
        };

        album.songs = (await this._pool.query(query)).rows;
      }

      return album;
    }
    return (await this._pool.query('SELECT * FROM albums')).rows;
  }
}

module.exports = AlbumService;
