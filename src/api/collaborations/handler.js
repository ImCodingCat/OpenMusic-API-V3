const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class CollaborationHandler {
  constructor(collaborationService, playlistService, validator) {
    this._collaborationService = collaborationService;
    this._playlistService = playlistService;
    this._validator = validator;

    autoBind(this);
  }

  async addColaboration(request, h) {
    this._validator.validate(request.payload);
    const { userId: senderId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistService.checkPlaylist(playlistId, userId, true, senderId);
    const collaborationId = await this._collaborationService.addCollaboration(playlistId, userId);

    return h.response(formatter(true, undefined, { collaborationId })).code(201);
  }

  async deleteCollaboration(request, h) {
    this._validator.validate(request.payload);
    const { userId: senderId } = request.auth.credentials;
    const { playlistId, userId } = request.payload;

    await this._playlistService.checkPlaylist(playlistId, userId, true, senderId);
    await this._collaborationService.deleteCollaboration(playlistId, userId);

    return h.response(formatter(true, 'Collaboration has been deleted')).code(200);
  }
}

module.exports = CollaborationHandler;
