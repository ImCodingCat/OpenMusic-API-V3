const AuthApi = require('../api/auth');
const UserService = require('../services/UserService');
const TokenService = require('../services/TokenService');
const TokenManager = require('../manager/Token');
const AuthValidator = require('../validator/auth');
// Made by mdavap

function registerAuth() {
  const usersService = new UserService();
  const tokenService = new TokenService();

  return {
    plugin: AuthApi,
    options: {
      usersService,
      tokenService,
      tokenManager: TokenManager,
      validator: AuthValidator,
    },
  };
}

module.exports = registerAuth;
