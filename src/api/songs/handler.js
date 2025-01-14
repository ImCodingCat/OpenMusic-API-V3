const autoBind = require('auto-bind');
const formatter = require('../../formatter');
// Made by mdavap

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async createSong(request, h) {
    const { payload } = request;

    this._validator.validate(payload);

    const songId = await this._service.addSong(payload);

    return h.response(formatter(true, undefined, { songId })).code(201);
  }

  async getSongs(request, h) {
    if (Object.keys(request.query).length) {
      const song = await this._service.findSong(request.query);

      return h.response(formatter(true, undefined, { songs: song })).code(200);
    }

    const songs = await this._service.getSong();

    return h.response(formatter(true, undefined, { songs })).code(200);
  }

  async getSong(request, h) {
    const { songId } = request.params;
    const song = await this._service.getSong(songId);

    return h.response(formatter(true, undefined, { song })).code(200);
  }

  async updateSong(request, h) {
    const { songId } = request.params;
    const { payload } = request;

    this._validator.validate(payload);

    const updatedSong = await this._service.updateSong(songId, payload);

    return h.response(formatter(true, 'Song has been updated', { song: updatedSong })).code(200);
  }

  async deleteSong(request, h) {
    const { songId } = request.params;

    await this._service.deleteSong(songId);

    return h.response(formatter(true, 'Song has been deleted')).code(200);
  }
}

module.exports = SongHandler;
