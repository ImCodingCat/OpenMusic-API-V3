const { Pool } = require('pg');
const { hash: hashPassword, compare: comparePassword } = require('bcrypt');
const {
  InternalError, NotFoundError, ValidationError, UnauthorizedError,
} = require('../exceptions');
const GenerateId = require('../generator');

// Made by mdavap

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async checkUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new ValidationError('Username has been used');
    }
  }

  async createUser({ username, password, fullname }) {
    await this.checkUsername(username);

    const id = `user-${GenerateId()}`;
    const hashedPassword = await hashPassword(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InternalError('Failed to create new user');
    }

    return result.rows[0].id;
  }

  async verifyUser({ username, password }) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new UnauthorizedError('Username or Password is wrong');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await comparePassword(password, hashedPassword);

    if (!match) {
      throw new UnauthorizedError('Username or Password is wrong');
    }

    return id;
  }

  async getUser(id) {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User doesnt exist');
    }

    return result.rows[0];
  }
}

module.exports = UserService;
