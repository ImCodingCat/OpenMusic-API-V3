const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class AuthHandler {
  constructor(usersService, tokenService, tokenManager, validator) {
    this._usersService = usersService;
    this._tokenService = tokenService;
    this._validator = validator;
    this._tokenManager = tokenManager;

    autoBind(this);
  }

  async registerUser(request, h) {
    const { payload } = request;

    this._validator.validateRegister(payload);

    const userId = await this._usersService.createUser(payload);

    return h.response(formatter(true, undefined, { userId })).code(201);
  }

  async loginUser(request, h) {
    const { payload } = request;

    this._validator.validateLogin(payload);

    const userId = await this._usersService.verifyUser(payload);
    const accessToken = await this._tokenManager.generateAccessToken({ userId });
    const refreshToken = await this._tokenManager.generateRefreshToken({ userId });

    await this._tokenService.addRefreshToken(refreshToken);

    return h.response(formatter(true, 'Login success', { accessToken, refreshToken })).code(201);
  }

  async refreshToken(request, h) {
    const { payload } = request;

    this._validator.validateRefreshToken(payload);

    await this._tokenService.verifyRefreshToken(payload);

    const { userId } = this._tokenManager.verifyRefreshToken(payload);

    const accessToken = await this._tokenManager.generateAccessToken({ userId });

    return h.response(formatter(true, 'Token updated', { accessToken })).code(200);
  }

  async deleteToken(request, h) {
    const { payload } = request;

    this._validator.validateRefreshToken(payload);

    await this._tokenService.verifyRefreshToken(payload);
    await this._tokenService.deleteRefreshToken(payload);

    return h.response(formatter(true, 'Token has been deleted')).code(200);
  }
}

module.exports = AuthHandler;
