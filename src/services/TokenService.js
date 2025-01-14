const { Pool } = require('pg');
const { InternalError, ValidationError } = require('../exceptions');
const GenerateId = require('../generator');
// Made by mdavap

class TokenService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(token) {
    const id = `token-${GenerateId()}`;

    const query = {
      text: 'INSERT INTO tokens VALUES($1, $2) RETURNING id',
      values: [id, token],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalError('Failed to add refresh token');
    }

    return result.rows[0].id;
  }

  async verifyRefreshToken({ refreshToken }) {
    const query = {
      text: 'SELECT token FROM tokens WHERE token = $1',
      values: [refreshToken],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ValidationError('Invalid token');
    }
  }

  async deleteRefreshToken({ refreshToken }) {
    const query = {
      text: 'DELETE FROM tokens WHERE token = $1 RETURNING id',
      values: [refreshToken],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InternalError('Failed to delete token');
    }
  }
}

module.exports = TokenService;
