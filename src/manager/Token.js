const { token } = require('@hapi/jwt');
const { ValidationError } = require('../exceptions');
const { auth } = require('../config');

const TokenService = {
  generateAccessToken: (payload) => token.generate(payload, auth.access_key),
  generateRefreshToken: (payload) => token.generate(payload, auth.refresh_key),
  verifyRefreshToken: ({ refreshToken }) => {
    try {
      const artifacts = token.decode(refreshToken);
      token.verify(artifacts, auth.refresh_key);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new ValidationError('Invalid refresh token');
    }
  },
};

module.exports = TokenService;
