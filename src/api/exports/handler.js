const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class ExportHandler {
  constructor(producerService, playlistService, validator) {
    this._producerService = producerService;
    this._playlistService = playlistService;
    this._validator = validator;

    autoBind(this);
  }

  async exportPlaylist(request, h) {
    const { payload } = request;

    this._validator.validate(payload);

    const { userId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { targetEmail } = payload;

    await this._playlistService.checkPlaylist(playlistId, userId);
    await this._producerService.sendMessage('export:playlists', JSON.stringify({ playlistId, targetEmail }));

    return h.response(formatter(true, 'Permintaan Anda sedang kami proses')).code(201);
  }
}

module.exports = ExportHandler;
